package model

import (
	"time"

	"github.com/google/uuid"
)

type Tasks struct {
	ID       uuid.UUID  `json:"id"`
	Title    string     `json:"title"`
	Status   *string    `json:"status"`
	DueDate  time.Time  `json:"due_date"`
	Assignee *uuid.UUID `json:"assignee"`
}
