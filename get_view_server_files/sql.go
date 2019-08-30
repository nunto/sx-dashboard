package main;

import (
	"database/sql"
	"net/http"
	"fmt"
	"io/ioutil"
	"encoding/json"
	"strings"
	_ "github.com/denisenkom/go-mssqldb"
)

// POST body for insert is stored in a var of this type
type INSERT_DATA struct {
	ClientId int64 `json:"client_id"`
	Layout string `json:"layout"`
	Items string `json:"items"`
}

// POST body for getData is stored in a var of this type 
type CLIENT_ID struct {
	ClientId int64 `json:"client_id"`
}

// Insert data into SQL
func insert(w http.ResponseWriter, r *http.Request) {
	// Get body of the POST req
	body, errBody := ioutil.ReadAll(r.Body)
	if errBody != nil {
		fmt.Println("Error reading body: ", errBody.Error())
	}

	// To store req data
	var data INSERT_DATA
	
	// Get JSON data
	jsonErr := json.Unmarshal(body, &data)
	if jsonErr != nil {
		fmt.Println("Error unmarshalling: ", jsonErr.Error())
	}
	// Connect to SQL server
	conn, errdb := sql.Open("sqlserver", "server=172.18.19.57\\SQL17;user id=ReactClient;password=ReactPass1!;") 
	
	if errdb != nil {
		fmt.Println("Error opening db: ", errdb.Error())
	}

	type response struct {
		Result string
	}
	var res response;
	// Format a string for the query using data retrieved in the request
	var query string
	query = fmt.Sprintf("INSERT INTO ReactDB.dbo.Layouts (client_id, layout, items) VALUES (%d, '%s', '%s')", data.ClientId, data.Layout, data.Items)
	// Attempt to insert into DB
	_, errQuery := conn.Query(query)
	if errQuery != nil {
		if (strings.Contains(errQuery.Error(), "Cannot insert duplicate key")) {
			query = fmt.Sprintf("UPDATE ReactDB.dbo.Layouts SET layout = '%s', items = '%s' WHERE client_id=%d", data.Layout, data.Items, data.ClientId)
			_, errUpdate := conn.Query(query)
			if errUpdate != nil {
				fmt.Println("Error updating: ", errUpdate.Error())
				res.Result = "Fail"
			} else {
				res.Result = "Success"
			}
		} else {
			res.Result = "Fail"
		}
	} else {
		res.Result = "Success"
	}

	// Setting headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Sends a JSON response back to the client
	json.NewEncoder(w).Encode(res)

	defer conn.Close()
}

// Get data from sql
func getData(w http.ResponseWriter, r *http.Request) {
	// Get body of the POST req
	body, errBody := ioutil.ReadAll(r.Body)
	if errBody != nil {
		fmt.Println("Error reading body: ", errBody.Error())
	}

	// Stores the client_id to query for
	var id CLIENT_ID
	fmt.Println("Body -> ", string(body))

	// Get JSON data from body
	jsonErr := json.Unmarshal(body, &id)
	if jsonErr != nil {
		fmt.Println("Error unmarshalling: ", jsonErr.Error())
	}

	// Connect to DB
	conn, errdb := sql.Open("sqlserver", "server=172.18.19.57\\SQL17;user id=ReactClient;password=ReactPass1!;") 
	if errdb != nil {
		fmt.Println("Error opening db: ", errdb.Error())
	}

	// Initialize variables to temporarily hold the sql data
	var layout string
	var items string

	// Define a struct for the data that will be returned from sql
	type sqldata struct {
		Layout      string
		Items       string
	}

	// Return an array of sqldata objs
	var result []sqldata

	// Format a string for the query using data retrieved in the request
	query := fmt.Sprintf("SELECT layout, items FROM ReactDB.dbo.Layouts WHERE client_id=%d", id.ClientId)

	// Execute query
	rows, errQuery := conn.Query(query)
	if errQuery != nil {
		fmt.Println("Error selecting: ", errQuery.Error())
	}

	// Iterate through all rows returned
	// NOTE: Should only be one row since client_id is the primary key
	for rows.Next() {
		err := rows.Scan(&layout, &items)
		if err != nil {
			panic(err)
		}

		// Store row data in a sqldata object
		var data = sqldata {
			Layout:      layout,
			Items:       items,
		}

		// Append data to result array
		result = append(result, data)
	}

	// Setting headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Sends a JSON response back to the client
	json.NewEncoder(w).Encode(result)

	defer conn.Close()
}