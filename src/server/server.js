require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var Connection = require('tedious').connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var cors = require('cors')


var config = {
    username: process.env.SQL_UNAME,
    password: process.env.SQL_PASS,
    server: process.env.SQL_SRV
}

function executeStatement(query) {
    request = new Request(query);
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
        console.log("Curr result: " + result);
    });
    request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
    });  
    connection.execSql(request);
    return result;
}

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/db2', (req, res) => {
    console.log('get request')
    res.send({  express: 'You reached db2' })
})

app.post('/api/db', (req, res) => {
  console.log("Post was received")
  console.log(req.body);
  var conn = new Connection(config);
    conn.on('connect', function(err) {
        if (err) {
            console.log('Unable to connect: ' + err)
        } else {
            console.log('Connected')
            var result = executeStatement(req.body.query);
            res.send(result);
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));