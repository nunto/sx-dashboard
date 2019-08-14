package main;

import (
	"database/sql"
	"fmt"
	_ "github.com/denisenkom/go-mssqldb"
)

func insert() {
	conn, errdb := sql.Open("sqlserver", "server=SXL7-PC/SQL17;user id=ReactClient;password=ReactPass1;") 
	
	if errdb != nil {
		fmt.Println("Error opening db: ", errdb.Error())
	}

	client_id := 122334455
	items := "{this: is a test JSON STRING}"
	layout := "{same}"

	query := fmt.Sprintf("INSERT INTO ReactDB.dbo.Layouts VALUES %s %s %s", client_id, items, layout)

	_, errQuery := conn.Query(query)

}