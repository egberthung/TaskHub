package service

import (
	"errors"
	"taskhub/internal/auth"
	"taskhub/internal/dto"
	"taskhub/internal/model"
	"taskhub/internal/repository"

	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	Repo *repository.UserRepository
}

func (s *AuthService) Register(name, email, password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		return "", err
	}
	user := model.User{
		Name:     name,
		Email:    email,
		Password: string(hash),
	}
	if err := s.Repo.Create(user); err != nil {
		return "", err
	}

	u, err := s.Repo.FindByEmail(user.Email)
	if err != nil {
		return "", err
	}

	return auth.GenerateToken(u.ID)
}

func (s *AuthService) Login(email, password string) (string, error) {
	user, err := s.Repo.FindByEmail(email)

	if err != nil {
		return "", errors.New("User not found")
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		return "", errors.New("Wrong password")
	}

	return auth.GenerateToken(user.ID)
}

func (s *AuthService) GetUserService(userId string) (*model.User, error) {
	userDetail, err := s.Repo.GetUserDetail(userId)
	if err != nil {
		return nil, err
	}

	return userDetail, err
}

func (s *AuthService) GetAllUsers() ([]dto.AllUserResponse, error) {
	users, err := s.Repo.GetAllUsers()
	if err != nil {
		return nil, err
	}

	return users, err
}
