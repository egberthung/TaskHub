package repository

import (
	"database/sql"
	"errors"
	"taskhub/internal/dto"
	"taskhub/internal/model"

	"github.com/lib/pq"
)

type UserRepository struct {
	DB *sql.DB
}

var ErrEmailExists = errors.New("email already exists")

func (r *UserRepository) Create(user model.User) error {
	_, err := r.DB.Exec("INSERT INTO users (email, password,name) values ($1 , $2, $3)", user.Email, user.Password, user.Name)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok && pqErr.Code == "23505" {
			return ErrEmailExists
		}
		return err
	}
	return nil
}

func (r *UserRepository) FindByEmail(email string) (*model.User, error) {
	row := r.DB.QueryRow("SELECT id,password FROM users where email=$1", email)

	var user model.User
	err := row.Scan(&user.ID, &user.Password)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) GetUserDetail(userId string) (*model.User, error) {
	row := r.DB.QueryRow("select email, name from users where id=$1", userId)

	var user model.User

	err := row.Scan(&user.Email, &user.Name)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) GetAllUsers() ([]dto.AllUserResponse, error) {
	row, err := r.DB.Query("select id, name from users")
	if err != nil {
		return nil, err
	}
	defer row.Close()
	var users []dto.AllUserResponse

	for row.Next() {
		var user dto.AllUserResponse
		err := row.Scan(&user.ID, &user.Name)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}
