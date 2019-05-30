package main

import (
	"encoding/json"
	"log"
	"os"
	"sync"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

// Used to store current value grabbed from mqtt
var currentVal float64

// SafeVal struct used to allow locking and unlocking of curr var via mutex
type SafeVal struct {
	curr float64
	mux  sync.Mutex
}

var sv SafeVal

// Message handler for MQTT, any messages received get handled here
var f MQTT.MessageHandler = func(client MQTT.Client, msg MQTT.Message) {
	// Struct used to retrieve data from JSON
	// Any values defined here will be grabbed from the json in json.Unmarshal5
	// Capitalize the var names so they are public
	// Use pointers for the types so you can identify <nil> values
	type Data struct {
		Current *float64 `json:"ai1,omitempty"`
	}

	// sensorData is of the type we just defined above
	var sensorData Data

	// Load the MQTT Payload's JSON into sensorData
	err := json.Unmarshal(msg.Payload(), &sensorData)
	if err != nil {
		log.Println("--- ERROR UNMARSHALING ---")
		panic(err)
	}

	// If ai1 wasn't in the Payload, the pointer will be null
	// Check to make sure it exists
	if sensorData.Current != nil {
		// Value exists, set currentVal to it
		// currentVal then gets used in socket.go
		sv.mux.Lock()
		sv.curr = *sensorData.Current
		sv.mux.Unlock()
	}

}

// MQTT client to subscribe to the broker
func mqttClient(c chan os.Signal) {

	// MQTT Client setup
	// Add broker to connect to
	opts := MQTT.NewClientOptions().AddBroker("tcp://172.18.18.121:1883")
	opts.SetClientID("go-mqtt-client")
	// opts.SetUsername("sqlweb")
	// opts.SetPassword("ActiveM99")
	opts.SetKeepAlive(60)
	// opts.SetCleanSession(true)
	opts.SetDefaultPublishHandler(f)

	// Subsribe to the broker using the channel given in server.go
	opts.OnConnect = func(c MQTT.Client) {
		if token := c.Subscribe("#", 0, f); token.Wait() && token.Error() != nil {
			panic(token.Error())
		}
	}

	// Create the client using options specified above
	client := MQTT.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		log.Println(token.Error())
		os.Exit(1)
	} else {
		log.Println("Connected")
	}

}
