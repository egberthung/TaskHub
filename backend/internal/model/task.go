package model

import (
	"time"

	"github.com/google/uuid"
)

type TaskStatus string

const (
	TaskOpen      TaskStatus = "open"
	TaskOngoing   TaskStatus = "ongoing"
	TaskCompleted TaskStatus = "completed"
	TaskOverdue   TaskStatus = "overdue"
)

func (s TaskStatus) IsValid() bool {
	switch s {
	case TaskOpen, TaskOngoing, TaskCompleted, TaskOverdue:
		return true
	default:
		return false
	}
}

type Tasks struct {
	ID       uuid.UUID  `json:"id"`
	Title    string     `json:"title"`
	Status   TaskStatus `json:"status"`
	DueDate  time.Time  `json:"due_date"`
	Assignee *uuid.UUID `json:"assignee"`
}
