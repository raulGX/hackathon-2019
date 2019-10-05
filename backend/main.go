package main

import (
	"net/http"
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

	n.UseFunc(func(w http.ResponseWriter, req *http.Request, next http.HandlerFunc) {
		defer func() {
			if err := recover(); err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte("Internal Server Error"))
			}
		}()
		next(w, req)
	})

	n.UseFunc(func(w http.ResponseWriter, req *http.Request, next http.HandlerFunc) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if (*req).Method == "OPTIONS" {
			return
		}
		next(w, req)
	})

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
