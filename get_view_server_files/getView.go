package main

import (
	"fmt"
	"database/sql"
	"net/http"
	_ "github.com/denisenkom/go-mssqldb"
	//"io/ioutil"
	"encoding/json"
)

type sqlview struct {
	Name string `json:"view_name"`
}

type view struct {
	ColNames string
	Rows string
}

func getView(w http.ResponseWriter, r *http.Request) {

	// This was used to get the body from the request at first
	// If getView query needs data from the request body use this

	/*body, errBody := ioutil.ReadAll(r.Body)
	if errBody != nil {
		fmt.Println("Error reading body: ", errBody.Error())
	}
	
	var viewQuery sqlview
	jsonErr := json.Unmarshal(body, &viewQuery)
	if jsonErr != nil {
		fmt.Println("Error unmarshalling: ", jsonErr.Error())
	}*/

	//conn, errdb := sql.Open("sqlserver", "server=172.18.19.57\\SQL17;user id=ReactClient;password=ReactPass1!;")
	conn, errdb := sql.Open("sqlserver",
		"server=sxsensors;user id=sqltest;password=Testaccount123!;")
	if errdb != nil {
		fmt.Println("Error opening db: ", errdb.Error())
		fmt.Println(conn)
	}

	//query := "SELECT * FROM ReactDB.dbo.V_Layouts"
	query := "SELECT TOP (10) * FROM Enterprise.dbo.vw_SensorGraph"

	rows, errQuery := conn.Query(query)
	if errQuery != nil {
		fmt.Println("Error querying: ", errQuery)
	}

	cols, errCols := rows.Columns()
	if errCols != nil {
		fmt.Println(errCols)
	}

	vals := make([]sql.RawBytes, len(cols))
	scanArgs := make([]interface{}, len(vals))
	for i, _ := range cols {
		scanArgs[i] = &vals[i]
	}

	var result [][]string
	for rows.Next() {
		err := rows.Scan(scanArgs...)
		if err != nil {
			fmt.Println("error scanning: ", err.Error())
		}

		row := make([]string, len(vals))
		for i, data := range vals {
			if data == nil {
				row[i] = "NULL"
			} else {
				row[i] = string(data) 
			}
		}
		result = append(result, row)	
	}

	type json_result struct {
		Cols []string
		Rows [][]string
	}

	var returnJson = json_result {
		Cols: cols,
		Rows: result,
	}
	fmt.Println(returnJson)
	fmt.Println(cols)
	fmt.Println(result[0][0])

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(returnJson)

	defer conn.Close()
}