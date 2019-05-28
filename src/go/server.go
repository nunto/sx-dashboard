package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/denisenkom/go-mssqldb"
	MQTT "github.com/eclipse/paho.mqtt.golang"
)

var f MQTT.MessageHandler = func(client MQTT.Client, msg MQTT.Message) {
	log.Printf("TOPIC: %s\n", msg.Topic())
	log.Printf("MSG: %s\n", msg.Payload())
}

// Returns the necessary data to create a timeline object
func timeline(w http.ResponseWriter, r *http.Request) {
	// Open connection --> Need to hide login info later
	conn, errdb := sql.Open("sqlserver",
		"server=sxsensors;user id=sqltest;password=Testaccount123!;")

	if errdb != nil {
		fmt.Println("Error opening db: ", errdb.Error())
	}

	// Initialize variables to temporarily hold the sql data
	var msgDate string
	var runningState int
	var sensorName string

	/*
	 * Define a struct with the data that will be returned
	 * Remember to capitalize fields (ElementDate, Status etc)
	 * so they get exported from the struct and can be rendered
	 */
	type sqldata struct {
		ElementDate string
		Status      int
		Name        string
	}

	// Return an array of sqldata objs
	var result []sqldata

	// Query the db
	rows, err := conn.Query(
		`SELECT Messagedate, 
			runningstate, 
			SensorName 
		FROM Enterprise.dbo.vw_SensorGraph`)

	if err != nil {
		log.Fatal(err)
	}

	// Send all the data from each row into the result array as sqldata objs
	for rows.Next() {
		err := rows.Scan(&msgDate, &runningState, &sensorName)

		if err != nil {
			log.Fatal(err)
		}

		var data = sqldata{
			ElementDate: msgDate,
			Status:      runningState,
			Name:        sensorName,
		}

		result = append(result, data)
	}

	// Setting headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Sends a JSON response back to the client
	json.NewEncoder(w).Encode(result)

	log.Println(result)
	defer conn.Close()
}

func main() {
	// Http server setup
	//http.HandleFunc("/api/timeline", timeline)
	//if err := http.ListenAndServe(":8080", nil); err != nil {
	//	panic(err)
	//}

	//MQTT Client setup
	opts := MQTT.NewClientOptions().AddBroker("ws://127.0.0.1:9001")
	opts.SetClientID("go-mqtt-client")
	opts.SetUsername("sqlweb")
	opts.SetPassword("ActiveM99")
	opts.SetKeepAlive(60)
	opts.SetCleanSession(true)
	opts.SetDefaultPublishHandler(f)

	client := MQTT.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}

	if token := client.Subscribe("#", 0, mqttSubscribe); token.Wait() && token.Error() != nil {
		fmt.Println(token.Error())
		os.Exit(1)
	}
}
