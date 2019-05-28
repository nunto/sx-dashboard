var Connection = require('tedious').connection;
require('dotenv').load();

var config = {
    username: process.env.SQL_UNAME,
    password: process.env.SQL_PASS,
    server: process.env.SQL_SRV
}

var conn = new Connection(config);
conn.on('connect', function(err) {
    if (err) {
        console.log('Unable to connect: ' + err)
    } else {
        console.log('Connected')
    }
});

var Request = require('tedious').Request;
var TYPES = requires('tedious').TYPES;

function executeStatement() {
    req = new Request('SQL QUERY GOES HERE');
    if (err) {
        console.log(err);
    }
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
        });
        console.log(result);
        result="";
    });
    request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
    });  
    connection.execSql(req);
}