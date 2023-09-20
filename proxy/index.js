import express from 'express'

const app = express()

const port = process.env.PORT || 5000

app.get('*', (req, res) => {
    console.log(req)

    let headers
    let host
    let parsed

    headers = req.headers
    host = req.host

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    parsed = new URL(fullUrl)

    res.json({
        headers,
        host,
        parsed,
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
