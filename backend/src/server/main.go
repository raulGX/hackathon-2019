package server

import (
	"server/events"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

// AddRoutes adds routes to existing router mx.
func AddRoutes(mx *mux.Router) {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	//create session here

	initRoutes(mx, formatter)
}

func initRoutes(mx *mux.Router, formatter *render.Render) {
	mx.HandleFunc("/products", events.ListEventsHandler(formatter)).Methods("GET")
}
