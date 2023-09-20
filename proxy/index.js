import express from 'express'

const app = express()

const port = process.env.PORT || 5000

app.get('*', (req, res) => {
    // console.log(req)

    let fullUrl
    let headers
    let host
    let subdomain
    let parsed
    let sourceUrl

    headers = req.headers
    host = req.host

    fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    parsed = new URL(fullUrl)

    subdomain = parsed.hostname.split('.')[0]

    sourceUrl = req.protocol + `://nexa.garden/ipfs/${subdomain}` + req.originalUrl

    res.json({
        headers,
        host,
        parsed,
        subdomain,
        sourceUrl,
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
