package main

import (
	"log"
	"taskhub/internal/config"
	"taskhub/internal/db"
	"taskhub/internal/handler"
	"taskhub/internal/repository"
	"taskhub/internal/service"
	"taskhub/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal(".env tidak ditemukan atau gagal diload")
	}
	cfg := config.Load()

	database, err := db.Connect(cfg)

	if err != nil {
		log.Fatal(err)
	}

	authRepo := &repository.UserRepository{DB: database}
	authService := &service.AuthService{Repo: authRepo}
	authHandler := &handler.AuthHandler{Service: authService}

	taskRepo := &repository.TaskRepository{DB: database}
	taskService := &service.TaskService{Repo: taskRepo}
	taskHandler := &handler.TaskHandler{Service: taskService}

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	routes.SetUp(r, authHandler, taskHandler)
	r.Run(":8081")
}
