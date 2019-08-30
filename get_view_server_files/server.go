package main

import (
	"net/http"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)


func main() {
	// Redirect URL requests
	/*
	http.HandleFunc("/insert", insert)
	http.HandleFunc("/select", getData)

	// Start server on port 8080
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Error creating http server: ", err.Error())
	}*/

	//Http server setup
	router := mux.NewRouter()
	// Handles SQL Request
	router.HandleFunc("/api/insert", insert)
	// Handles mqtt live data
	router.HandleFunc("/api/select", getData)

	router.HandleFunc("/api/get-view", getView)

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