const cors = require("cors")
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const logRequests = require('./src/common/log')
const app = express()
const port = 8082;

app.use(express.json());
app.use(cors());

app.listen(port, function() {
    console.log("Starting the app...");
})

app.use(logRequests)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

require('./src/api/endpoints')(app)


var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://root:rootpassword@localhost:27017', function (err, db) {
  if (err) throw err

const myDB = db.db("mydb")

//   myDB.createCollection("votos", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });

  myDB.collection("votos").find({}).toArray(function(err, result) {  
    if (err) throw err;  
    console.log(result);  
    db.close();  
  });  
})

module.exports = app