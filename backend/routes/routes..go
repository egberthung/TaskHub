package routes

import (
	"taskhub/internal/handler"
	"taskhub/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetUp(r *gin.Engine, authH *handler.AuthHandler, taskH *handler.TaskHandler) {
	r.POST("/register", authH.Register)
	r.POST("/login", authH.Login)
	protected := r.Group("/api/taskhub")
	protected.Use(middleware.AuthMiddleware())
	protected.GET("/user", authH.GetUserHandler)
	protected.GET("/users", authH.GetAllUsersHandler)
	protected.POST("/create-task", taskH.AddTaskHandler)
	protected.GET("/tasks", taskH.GetAllTask)
}
