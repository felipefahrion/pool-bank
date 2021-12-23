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

module.exports = app