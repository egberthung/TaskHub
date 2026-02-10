package handler

import (
	"errors"
	"net/http"
	"taskhub/internal/repository"
	"taskhub/internal/service"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	Service *service.AuthService
}

func (h *AuthHandler) Register(c *gin.Context) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Name     string `json:"name"`
	}

	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	token, err := h.Service.Register(body.Name, body.Email, body.Password)
	if err != nil {
		if errors.Is(err, repository.ErrEmailExists) {
			c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.SetCookie("user-login", token, 3600*1, "/", "", false, true)
	c.JSON(http.StatusCreated, gin.H{"message": "Account registered"})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	c.BindJSON(&body)

	token, err := h.Service.Login(body.Email, body.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.SetCookie("user-login", token, 3600*1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"success": true})
}

func (h *AuthHandler) GetUserHandler(c *gin.Context) {
	userID := c.GetString("user_id")
	user, err := h.Service.GetUserService(userID)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"id":    user.ID,
		"email": user.Email,
		"name":  user.Name,
	})
}

func (h *AuthHandler) GetAllUsersHandler(c *gin.Context) {
	users, err := h.Service.GetAllUsers()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"users": users,
	})
}
