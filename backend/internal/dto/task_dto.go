package dto

import (
	"time"

	"github.com/google/uuid"
)

type TaskWithAssignee struct {
	ID               uuid.UUID `json:"id"`
	Title            string    `json:"title"`
	Status           string    `json:"status"`
	DueDate          time.Time `json:"due_date"`
	AssigneeUsername *string   `json:"assignee"`
}

type TaskStatResponse struct {
	TotalTasks     int `json:"total_tasks"`
	OpenTasks      int `json:"open_tasks"`
	OngoingTasks   int `json:"ongoing_tasks"`
	CompletedTasks int `json:"completed_tasks"`
	OverdueTasks   int `json:"overdue_tasks"`
}
