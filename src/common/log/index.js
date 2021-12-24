function logRequests(req, res, next) {
    const { method, url, params} = req

    const logLabel = `[${method.toUpperCase()}] ${url}`
    console.log(logLabel)

    next()

    console.log(logLabel)
}

module.exports = logRequests