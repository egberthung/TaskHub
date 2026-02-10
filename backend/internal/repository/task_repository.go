package repository

import (
	"database/sql"
	"fmt"
	"strings"
	"taskhub/internal/dto"
	"taskhub/internal/model"

	"github.com/google/uuid"
)

type TaskRepository struct {
	DB *sql.DB
}

func (r *TaskRepository) CreateTask(task model.Tasks) (uuid.UUID, error) {
	var id uuid.UUID
	err := r.DB.QueryRow("INSERT INTO tasks (title, due_date, assignee) values ($1 , $2, $3) returning id", task.Title, task.DueDate, task.Assignee).Scan(&id)
	if err != nil {
		return uuid.Nil, err
	}
	return id, nil
}

func (r *TaskRepository) GetAllTask() ([]dto.TaskWithAssignee, error) {
	rows, err := r.DB.Query("SELECT t.id, t.title, t.status, t.due_date, u.name FROM tasks t left join users u on t.assignee=u.id")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var tasks []dto.TaskWithAssignee
	for rows.Next() {
		var task dto.TaskWithAssignee
		err := rows.Scan(
			&task.ID,
			&task.Title,
			&task.Status,
			&task.DueDate,
			&task.AssigneeUsername,
		)
		if err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}
	return tasks, nil
}

func (r *TaskRepository) GetTaskCount() (dto.TaskStatResponse, error) {
	var stats dto.TaskStatResponse
	row := r.DB.QueryRow(`SELECT
	COUNT(*) AS total_task,
	COALESCE(SUM(CASE WHEN status = 'open' THEN 1 END), 0) AS open,
	COALESCE(SUM(CASE WHEN status = 'completed' THEN 1 END), 0) AS completed,
	COALESCE(SUM(CASE WHEN status = 'ongoing' THEN 1 END), 0) AS ongoing,
	COALESCE(SUM(CASE WHEN status = 'overdue' THEN 1 END), 0) AS overdue
	FROM tasks`)

	err := row.Scan(&stats.TotalTasks, &stats.OpenTasks, &stats.CompletedTasks, &stats.OngoingTasks, &stats.OverdueTasks)
	if err != nil {
		return stats, err
	}
	return stats, nil
}

func (r *TaskRepository) UpdateTask(req dto.UpdateTaskRequest, id uuid.UUID) error {
	query := "UPDATE tasks set "
	args := []any{}
	i := 1

	if req.Title != nil {
		query += fmt.Sprintf("title=$%d,", i)
		args = append(args, *req.Title)
		i++
	}
	if req.Status != nil {
		query += fmt.Sprintf("status=$%d,", i)
		args = append(args, *req.Status)
		i++
	}
	if req.Assignee != nil {
		query += fmt.Sprintf("assignee=$%d,", i)
		args = append(args, *req.Assignee)
		i++
	}
	if req.DueDate != nil {
		query += fmt.Sprintf("due_date=$%d,", i)
		args = append(args, *req.DueDate)
		i++
	}
	if len(args) == 0 {
		return fmt.Errorf("no fields to update")
	}
	query = strings.TrimSuffix(query, ",")
	query += fmt.Sprintf(" WHERE id=$%d", i)
	args = append(args, id)

	_, err := r.DB.Exec(query, args...)
	return err
}
