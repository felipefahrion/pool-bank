function logRequests(req, res, next) {
    const { method, url, params} = req

    const logLabel = `[${method.toUpperCase()}] ${url}`
    console.time(logLabel)

    next()

    console.timeEnd(logLabel)
}

module.exports = logRequests