package main

import (
	"net/http"
	"os"
	"os/signal"
	"syscall"

	_ "github.com/denisenkom/go-mssqldb"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func server() {
	//Http server setup
	router := mux.NewRouter()
	// Handles SQL Request
	router.HandleFunc("/api/timeline", timeline)
	// Handles mqtt live data
	router.HandleFunc("/current", updater).Methods("GET", "POST")

	// Enabling localhost:3000 access
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})

	// Creates a handler with cors opts defined above
	handler := c.Handler(router)

	// Listen on port 8080
	err := http.ListenAndServe(":8080", handler)
	if err != nil {
		panic(err)
	}

}

func main() {
	go server() // run server in a goroutine
	// channel 'c' is used to ensure mqtt client stays subscribed indefinitely
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go mqttClient(c) // Run mqtt in a goroutine
	<-c
}
