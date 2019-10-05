package main

import (
	"net/http"
	"os"

	"github.com/codegangsta/negroni"

	"github.com/bytexro/hackaton2019-wubbadubdub/backend/events"
	"github.com/bytexro/hackaton2019-wubbadubdub/backend/marketplace"
	"github.com/bytexro/hackaton2019-wubbadubdub/backend/users"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

func main() {
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "2000"
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
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		next(w, req)
	})

	n.UseFunc(func(w http.ResponseWriter, req *http.Request, next http.HandlerFunc) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-TOKEN")
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
	userRepo := users.NewInMemoryUserRepo()
	userService := users.NewUserService(userRepo, formatter)

	// events
	mx.HandleFunc("/events", eventService.EventsHandleGet()).Methods("GET")
	mx.HandleFunc("/events",
		userService.MustLogin(eventService.EventsHandlePost()),
	).Methods("POST")
	mx.HandleFunc("/events/{id}/register",
		userService.MustLogin(eventService.EventsHandleRegister()),
	).Methods("POST")
	mx.HandleFunc("/events/{id}/unregister",
		userService.MustLogin(eventService.EventsHandleUnRegister()),
	).Methods("POST")

	// user
	mx.HandleFunc("/register", userService.HandleUserRegister()).Methods("POST")
	mx.HandleFunc("/login", userService.HandleUserLogin()).Methods("POST")
	mx.HandleFunc("/userInfo", userService.MustLogin(userService.HandleUserInfo())).Methods("GET")

	// products
	productService := marketplace.NewProductService(marketplace.NewInMemoryProductRepo(), formatter)
	mx.HandleFunc("/marketplace", productService.ProductsHandleGet()).Methods("GET")
	mx.HandleFunc("/marketplace", userService.MustLogin(productService.ProductsHandlePost())).Methods("POST")

	n.UseHandler(mx)
	n.Run(":" + port)
}
