package events

import (
	"encoding/json"
	"net/http"
	"sync"

	"github.com/unrolled/render"
)

type Event struct {
	Name        string `json:name`
	Description string `json:description`
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
	AddEvent(Event) error
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

func (r *InMemoryEventsRepo) AddEvent(e Event) error {
	r.Lock()
	defer r.Unlock()

	r.events = append(r.events, e)

	return nil
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
		if err != nil {
			s.formatter.JSON(w, http.StatusBadRequest, "Failed to parse event")
			return
		}
		if !ev.IsValid() {
			s.formatter.JSON(w, http.StatusBadRequest, "Event is not valid")
			return
		}
		err = s.repo.AddEvent(ev)
		if err != nil {
			s.formatter.JSON(w, http.StatusInternalServerError, "Failed to save event")
			return
		}
		s.formatter.JSON(w, http.StatusOK, ev)
	}
}

func NewInMemoryService(formatter *render.Render) *EventsService {
	events := make([]Event, 0)
	return &EventsService{
		formatter: formatter,
		repo:      &InMemoryEventsRepo{events: events},
	}
}
