const cors = require("cors")
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const app = express()
const port = 8082;

app.use(express.json());
app.use(cors());

app.listen(port, function() {
    console.log("Starting the app...");
})

function logRequests(req, res, next) {
    const { method, url, params} = req

    const logLabel = `[${method.toUpperCase()}] ${url}`
    console.time(logLabel)

    next()

    console.timeEnd(logLabel)
}

app.use(logRequests)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

require('./src/api/endpoints')(app)

module.exports = app