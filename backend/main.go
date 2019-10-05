package main

import (
	"os"

	"github.com/codegangsta/negroni"

	"github.com/bytexro/hackaton2019-wubbadubdub/backend/events"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

func main() {
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "3000"
	}
	n := negroni.Classic()
	mx := mux.NewRouter()
	formatter := render.New(render.Options{
		IndentJSON: true,
	})

	eventService := events.NewInMemoryService(formatter)

	mx.HandleFunc("/events", eventService.EventsHandleGet()).Methods("GET")
	mx.HandleFunc("/events", eventService.EventsHandlePost()).Methods("POST")

	n.UseHandler(mx)
	n.Run(":" + port)
}
