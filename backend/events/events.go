package events

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"sync"

	"github.com/bytexro/hackaton2019-wubbadubdub/backend/users"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

type Event struct {
	ID              string   `json:"id"`
	Name            string   `json:"name"`
	Description     string   `json:"description"`
	UsersRegistered []string `json:"usersRegistered"`
}

func (e Event) IsValid() bool {
	if e.Name == "" {
		return false
	}

	if e.Description == "" {
		return false
	}

	return true
}

type IEventRepo interface {
	GetEvents() ([]Event, error)
	GetEvent(id string) (Event, error)
	AddEvent(Event) (Event, error)
	ModifyEvent(Event) (Event, error)
	RegisterUser(user, event string) (Event, error)
	UnRegisterUser(user, event string) (Event, error)
}

var (
	EventNotFound = fmt.Errorf("Event not found")
)

type InMemoryEventsRepo struct {
	sync.Mutex
	events []Event
}

func (r *InMemoryEventsRepo) GetEvents() ([]Event, error) {
	r.Lock()
	defer r.Unlock()
	return r.events, nil
}
func (r *InMemoryEventsRepo) GetEvent(id string) (Event, error) {
	r.Lock()
	defer r.Unlock()
	ev, ok := Event{}, false

	for _, e := range r.events {
		if e.ID == id {
			ev = e
			ok = true
			break
		}
	}

	if !ok {
		return ev, EventNotFound
	}
	return ev, nil
}

func (r *InMemoryEventsRepo) ModifyEvent(event Event) (Event, error) {
	r.Lock()
	defer r.Unlock()
	ev, ok := Event{}, false

	for i, e := range r.events {
		if e.Name == event.Name {
			r.events[i] = event
			ev = e
			ok = true
			break
		}
	}

	if !ok {
		return ev, EventNotFound
	}

	return ev, nil
}

func (r *InMemoryEventsRepo) AddEvent(e Event) (Event, error) {
	r.Lock()
	defer r.Unlock()

	e.UsersRegistered = make([]string, 0)
	e.ID = strconv.Itoa(len(r.events) + 1)
	r.events = append(r.events, e)

	return e, nil
}

func (r *InMemoryEventsRepo) RegisterUser(user, event string) (Event, error) {
	eventObj, err := r.GetEvent(event)
	if err != nil {
		return eventObj, EventNotFound
	}
	for _, u := range eventObj.UsersRegistered {
		if u == user {
			return eventObj, nil
		}
	}

	eventObj.UsersRegistered = append(eventObj.UsersRegistered, user)
	r.ModifyEvent(eventObj)
	return eventObj, nil
}
func (r *InMemoryEventsRepo) UnRegisterUser(user, event string) (Event, error) {
	eventObj, err := r.GetEvent(event)
	if err != nil {
		return eventObj, EventNotFound
	}
	newUsers := make([]string, 0)
	for _, u := range eventObj.UsersRegistered {
		if u != user {
			newUsers = append(newUsers, u)
		}
	}
	eventObj.UsersRegistered = newUsers
	r.ModifyEvent(eventObj)
	return eventObj, nil
}

type EventsService struct {
	repo      IEventRepo
	formatter *render.Render
}

func (s *EventsService) EventsHandleGet() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		events, err := s.repo.GetEvents()
		if err != nil {
			s.formatter.JSON(w, http.StatusInternalServerError, "Failed to get events")
			return
		}
		s.formatter.JSON(w, http.StatusOK, events)
	}
}

func (s *EventsService) EventsHandlePost() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		var ev Event
		err := decoder.Decode(&ev)
		user := req.Context().Value("user").(users.User)
		fmt.Printf("User: %v", user)
		if err != nil {
			s.formatter.JSON(w, http.StatusBadRequest, "Failed to parse event")
			return
		}
		if !ev.IsValid() {
			s.formatter.JSON(w, http.StatusBadRequest, "Event is not valid")
			return
		}
		ev, err = s.repo.AddEvent(ev)
		if err != nil {
			s.formatter.JSON(w, http.StatusInternalServerError, "Failed to save event")
			return
		}
		s.formatter.JSON(w, http.StatusOK, ev)
	}
}

func (s *EventsService) EventsHandleRegister() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		user := req.Context().Value("user").(users.User)
		vars := mux.Vars(req)
		id, ok := vars["id"]

		if !ok {
			s.formatter.JSON(w, http.StatusNotFound, "Failed to get event")
			return
		}

		event, err := s.repo.RegisterUser(user.Name, id)

		if err != nil {
			s.formatter.JSON(w, http.StatusBadRequest, err)
			return
		}

		s.formatter.JSON(w, http.StatusOK, event)
	}
}

func (s *EventsService) EventsHandleUnRegister() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		user := req.Context().Value("user").(users.User)
		vars := mux.Vars(req)
		id, ok := vars["id"]

		if !ok {
			s.formatter.JSON(w, http.StatusNotFound, "Failed to get event")
			return
		}

		event, err := s.repo.UnRegisterUser(user.Name, id)

		if err != nil {
			s.formatter.JSON(w, http.StatusNotFound, "Failed to unregister user")
			return
		}

		s.formatter.JSON(w, http.StatusOK, event)
	}
}

func NewInMemoryService(formatter *render.Render) *EventsService {
	events := []Event{}
	return &EventsService{
		formatter: formatter,
		repo:      &InMemoryEventsRepo{events: events},
	}
}
