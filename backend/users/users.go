package users

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	"github.com/unrolled/render"
)

var defaultCredits float64 = 10
var InsufficientFundsError = fmt.Errorf("User has not enough credits")
var UserNotFoundError = fmt.Errorf("User not found")

type User struct {
	Name     string  `json:"name"`
	Password *string `json:"password,omitempty"`
	IsAdmin  bool    `json:"isAdmin"` // should be removed
	Credits  float64 `json:"coins"`
}

type IUserRepo interface {
	GetUser(id string) (User, error)
	AddUser(u User) error
	VerifyUser(username, password string) bool
	AddCreditsToUser(user string, price float64) (User, error)
	RemoveCreditsFromUser(user string, price float64) (User, error)
}

type InMemoryUserRepo struct {
	sync.Mutex
	users map[string]User
}

func (r *InMemoryUserRepo) AddCreditsToUser(user string, price float64) (User, error) {
	r.Lock()
	defer r.Unlock()
	for i := range r.users {
		if r.users[i].Name == user {
			usr := r.users[i]
			usr.Credits += price
			r.users[i] = usr
			return r.users[i], nil
		}
	}
	return User{}, UserNotFoundError
}

func (r *InMemoryUserRepo) RemoveCreditsFromUser(user string, price float64) (User, error) {
	r.Lock()
	defer r.Unlock()
	for i := range r.users {
		if r.users[i].Name == user {
			user := r.users[i]
			if user.Credits <= price {
				return user, InsufficientFundsError
			}
			user.Credits -= price
			r.users[i] = user
			return r.users[i], nil
		}
	}
	return User{}, UserNotFoundError
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
		"bytex":       {"bytex", &defaultPass, true, defaultCredits},
		"mihaibogdan": {"mihaibogdan", &defaultPass, true, defaultCredits},
		"bailinca":    {"bailinca", &defaultPass, true, defaultCredits},
		"cristian":    {"cristian", &defaultPass, true, defaultCredits},
		"raul":        {"raul", &defaultPass, true, defaultCredits},
		"user1":       {"user1", &defaultPass, false, defaultCredits},
		"user2":       {"user2", &defaultPass, false, defaultCredits},
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
		user.Credits = defaultCredits
		s.repo.AddUser(user)

		s.formatter.JSON(w, http.StatusOK, map[string]string{"token": user.Name})
	}
}

func (s *UserService) HandleUserInfo() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		user := req.Context().Value("user").(User)

		s.formatter.JSON(w, http.StatusOK, user)
	}
}

func (s *UserService) MustLogin(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		token := req.Header.Get("X-TOKEN")
		if token == "" || token == "undefined" {
			token = req.Header.Get("Sec-WebSocket-Protocol")
		}
		if token == "" || token == "undefined" {
			q := req.URL.Query()["user"]
			if len(q) > 0 {
				token = q[0]
			}
		}
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
