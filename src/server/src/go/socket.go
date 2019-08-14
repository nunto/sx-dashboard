package main

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
)

// Setting upgrader options
var upgrader = websocket.Upgrader{
	ReadBufferSize:    1024,
	WriteBufferSize:   1024,
	EnableCompression: true,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// updater is called whenever /current is called
// this function is where web socket messages will be sent from
func updater(w http.ResponseWriter, r *http.Request) {
	// upgrader.Upgrade upgades from an http request handler to a
	// connection, 'c' which can be used to send and receive messages
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade:", err)
		return
	}
	defer c.Close()

	// Store the previously sent value here
	var prev float64

	// Infinite loop to keep sending messages, breaks on error
	for {
		// Mutex ensures the current value doesn't change when evaluating
		sv.mux.Lock()

		// Make sure the current value retrieved from mqtt isn't the same
		// sa the previous value.
		// currentVal is updated in the mqtt.go file
		if sv.curr != prev {
			prev = sv.curr
			sv.mux.Unlock()
			// Send a msg via the created websocket
			sendErr := c.WriteMessage(websocket.TextMessage,
				[]byte(strconv.FormatFloat(prev, 'f', 4, 64)))
			if sendErr != nil {
				log.Println("error writing->:", err)
				break
			}
			log.Printf("%f sent\n", prev)

			// continue statement to avoid calling Unlock() twice
			continue
		}
		sv.mux.Unlock()
		// Sleep for 1 second to avoid sending msgs too rapidly
		time.Sleep(1 * time.Second)
	}
}