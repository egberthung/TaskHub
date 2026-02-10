package service

import (
	"taskhub/internal/dto"
	"taskhub/internal/model"
	"taskhub/internal/repository"

	"github.com/google/uuid"
)

type TaskService struct {
	Repo *repository.TaskRepository
}

func (s *TaskService) AddTask(input model.Tasks) (uuid.UUID, error) {
	task := model.Tasks{
		Title:    input.Title,
		DueDate:  input.DueDate,
		Assignee: input.Assignee,
	}

	return s.Repo.CreateTask(task)
}

func (s *TaskService) GetAllTask() ([]dto.TaskWithAssignee, error) {
	return s.Repo.GetAllTask()
}

func (s *TaskService) GetTaskCount() (dto.TaskStatResponse, error) {
	return s.Repo.GetTaskCount()
}
