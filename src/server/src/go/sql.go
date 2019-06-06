package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/denisenkom/go-mssqldb"
)

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

	// Define a struct for the data that will be returned from sql
	// Remember to capitalize fields (ElementDate, Status etc)
	// so they are public
	type sqldata struct {
		ElementDate string
		Status      int
		Name        string
	}

	// Return an array of sqldata objs
	var result []sqldata

	// Query the db
	// Going to need to change this to a POST request with col names in the
	// body, and send the result back as a response.
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