package events

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"sync"

	"github.com/bytexro/hackaton2019-wubbadubdub/backend/users"
	"github.com/unrolled/render"
)

type Event struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
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
	AddEvent(Event) (Event, error)
}

type InMemoryEventsRepo struct {
	sync.Mutex
	events []Event
}

func (r *InMemoryEventsRepo) GetEvents() ([]Event, error) {
	r.Lock()
	defer r.Unlock()
	return r.events, nil
}

func (r *InMemoryEventsRepo) AddEvent(e Event) (Event, error) {
	r.Lock()
	defer r.Unlock()

	e.ID = strconv.Itoa(len(r.events) + 1)
	r.events = append(r.events, e)

	return e, nil
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

func NewInMemoryService(formatter *render.Render) *EventsService {
	events := []Event{}
	return &EventsService{
		formatter: formatter,
		repo:      &InMemoryEventsRepo{events: events},
	}
}
