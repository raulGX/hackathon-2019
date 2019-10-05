package users

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	"github.com/unrolled/render"
)

type User struct {
	Name     string  `json:"name"`
	Password *string `json:"password,omitempty"`
	IsAdmin  bool    `json:"IsAdmin"` // should be removed
}

type IUserRepo interface {
	GetUser(id string) (User, error)
	AddUser(u User) error
	VerifyUser(username, password string) bool
}

type InMemoryUserRepo struct {
	sync.Mutex
	users map[string]User
}

func (r *InMemoryUserRepo) GetUser(id string) (User, error) {
	r.Lock()
	defer r.Unlock()
	user, ok := r.users[id]
	if !ok {
		return user, fmt.Errorf("User not Found")
	}
	user.Password = nil
	return user, nil
}

func (r *InMemoryUserRepo) AddUser(u User) error {
	r.Lock()
	defer r.Unlock()
	_, ok := r.users[u.Name]
	if !ok {
		return fmt.Errorf("User exists")
	}
	r.users[u.Name] = u
	return nil
}

func (r *InMemoryUserRepo) VerifyUser(username, password string) bool {
	r.Lock()
	defer r.Unlock()
	if user, ok := r.users[username]; ok && user.Password != nil && *user.Password == password {
		return true
	}
	return false
}

func NewInMemoryUserRepo() *InMemoryUserRepo {
	defaultPass := "password"

	var users map[string]User = map[string]User{
		"bytex":       {"bytex", &defaultPass, true},
		"mihaibogdan": {"mihaibogdan", &defaultPass, true},
		"bailinca":    {"bailinca", &defaultPass, true},
		"cristian":    {"cristian", &defaultPass, true},
		"raul":        {"raul", &defaultPass, true},
		"user1":       {"user1", &defaultPass, false},
		"user2":       {"user2", &defaultPass, false},
	}

	return &InMemoryUserRepo{users: users}
}

type UserService struct {
	repo      IUserRepo
	formatter *render.Render
}

func NewUserService(r IUserRepo, formatter *render.Render) *UserService {
	return &UserService{
		r, formatter,
	}
}

func (s *UserService) HandleUserLogin() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		var user User
		err := decoder.Decode(&user)
		if err != nil {
			s.formatter.JSON(w, http.StatusBadRequest, "Failed to parse user")
			return
		}
		if ok := s.repo.VerifyUser(user.Name, *user.Password); !ok {
			s.formatter.JSON(w, http.StatusUnauthorized, "Bad credentials")
			return
		}
		s.formatter.JSON(w, http.StatusOK, map[string]string{"token": user.Name})
	}
}

func (s *UserService) HandleUserRegister() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		var user User
		err := decoder.Decode(&user)
		if err != nil {
			s.formatter.JSON(w, http.StatusBadRequest, "Failed to parse user")
			return
		}
		_, err = s.repo.GetUser(user.Name)

		if err == nil {
			s.formatter.JSON(w, http.StatusBadRequest, map[string]string{"error": "User already exists."})
		}

		user.IsAdmin = false
		s.repo.AddUser(user)

		s.formatter.JSON(w, http.StatusOK, map[string]string{"token": user.Name})
	}
}

func (s *UserService) MustLogin(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		token := req.Header.Get("X-TOKEN")
		user, err := s.repo.GetUser(token)
		if err != nil {
			s.formatter.JSON(w, http.StatusForbidden, "Bad credentials")
			return
		}
		user.Password = nil

		ctx := context.WithValue(req.Context(), "user", user)
		req = req.WithContext(ctx)

		f(w, req)
	}
}
