package handler

import (
	"net/http"
	"taskhub/internal/model"
	"taskhub/internal/service"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type TaskHandler struct {
	Service *service.TaskService
}

func (h *TaskHandler) AddTaskHandler(c *gin.Context) {
	var body struct {
		Title    string    `json:"title"`
		DueDate  time.Time `json:"due_date"`
		Assignee *string   `json:"assignee"`
	}

	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	var assigneeUUID *uuid.UUID
	if body.Assignee != nil {
		id, err := uuid.Parse(*body.Assignee)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid assignee UUID"})
			return
		}
		assigneeUUID = &id
	}

	id, err := h.Service.AddTask(model.Tasks{
		Title:    body.Title,
		DueDate:  body.DueDate,
		Assignee: assigneeUUID,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "OK", "id": id})
}

func (h *TaskHandler) GetAllTask(c *gin.Context) {
	tasks, err := h.Service.GetAllTask()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	stats, err := h.Service.GetTaskCount()

	c.JSON(http.StatusOK, gin.H{"tasks": tasks, "stats": stats})
}
