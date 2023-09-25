/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const assetsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/assets`)
const pinsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/pins`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let asset
    let response
    let tokenid

    /* Set token id. */
    tokenid = event.context.params.tokenid

    /* Validate token id. */
    if (!tokenid) {
        return `Oops! Please provide a token id.`
    }

    /* Request asset. */
    response = await assetsDb.get(tokenid)
        .catch(err => console.error(err))
    console.log('RESPONSE', response)

    /* Validate response. */
    if (!response) {
        return `Oops! We could not find [ ${tokenid} ]. Please try again...`
    }

    /* Clone the asset. */
    asset = {
        groupid: response._id,
        ...response,
    }

    /* Cleanup database keys. */
    delete asset._id
    delete asset._rev

    /* Return asset (data). */
    return asset
})
