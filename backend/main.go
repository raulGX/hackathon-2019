package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/codegangsta/negroni"

	"github.com/bytexro/hackaton2019-wubbadubdub/backend/events"
	"github.com/bytexro/hackaton2019-wubbadubdub/backend/marketplace"
	"github.com/bytexro/hackaton2019-wubbadubdub/backend/socket"
	"github.com/bytexro/hackaton2019-wubbadubdub/backend/users"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/unrolled/render"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
} // use default options

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

	// n.UseFunc(func(w http.ResponseWriter, req *http.Request, next http.HandlerFunc) {
	// 	// w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	// 	next(w, req)
	// })

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

	connectChan := make(chan socket.Connection, 1000)
	dispatcherChan := make(chan interface{}, 1000)
	go func() {
		users := make(map[string]chan<- []byte)
		for {
			select {
			case connection := <-connectChan:
				fmt.Printf("Registering user %v", connection.User)
				if connection.Type == socket.ON {
					users[connection.User.Name] = connection.ToClient
				} else {
					delete(users, connection.User.Name)
				}
			case dispatch := <-dispatcherChan:
				fmt.Printf("Dispatching message %v", dispatch)
				bytes, err := json.Marshal(dispatch)
				if err != nil {
					fmt.Printf("Failed to format %v err:%v", dispatch, err)
				}
				for _, channel := range users {
					channel <- bytes
				}
			}
		}
	}()
	userRepo := users.NewInMemoryUserRepo()
	eventService := events.NewInMemoryService(formatter, dispatcherChan, userRepo)
	userService := users.NewUserService(userRepo, formatter)

	// events
	mx.HandleFunc("/events", eventService.EventsHandleGet()).Methods("GET")
	mx.HandleFunc("/events/{id}/start", eventService.EventsHandleStart()).Methods("POST")
	mx.HandleFunc("/events/{id}/finish", eventService.EventsHandleStop()).Methods("POST")
	mx.HandleFunc("/events/{id}/cancel", eventService.EventsHandleCancel()).Methods("POST")
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

	mx.HandleFunc("/ws", func(w http.ResponseWriter, req *http.Request) {
		userId := req.URL.Query()["user"]
		user, err := userRepo.GetUser(userId[0])
		if err != nil {
			log.Println("Failed to get user:", err)
		}
		c, err := upgrader.Upgrade(w, req, nil)
		if err != nil {
			log.Println("upgrade:", err)
			return
		}
		outchan := make(chan []byte, 1000)

		connectChan <- socket.Connection{Type: socket.ON, User: user, ToClient: outchan}
		defer func() {
			connectChan <- socket.Connection{Type: socket.Off, User: user, ToClient: nil}
			c.Close()
			close(connectChan)
			close(outchan)
		}()

		for {
			select {
			case msg := <-outchan:
				err = c.WriteMessage(websocket.TextMessage, msg)
				if err != nil {
					log.Println("write:", err)
					break
				}
			case <-req.Context().Done():
				break
			}
		}
	})
	mx.NotFoundHandler = http.HandlerFunc(NotFoundHandler)
	n.UseHandler(mx)
	n.Run(":" + port)
}

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	// You can use the serve file helper to respond to 404 with
	// your request file.

	http.ServeFile(w, r, "public/index.html")
}
