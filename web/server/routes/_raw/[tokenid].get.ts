/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const assetsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/assets`)
const pinsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/pins`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let binArchive
    let binSource
    let cid
    let ownerid
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
    // console.log('RESPONSE', response)

    /* Validate response. */
    if (!response) {
        return `Oops! We could not find [ ${tokenid} ]. Please try again...`
    }

    /* Set content id. */
    cid = response?.cid

    /* Validate content id. */
    if (!cid) {
        return `Oops! We could not find a data file. Please try again...`
    }

    /* Request content id. */
    response = await pinsDb.get(cid)
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    /* Validate response. */
    if (!response) {
        return `Oops! We could not find a data file. Please try again...`
    }

    /* Set ownerid. */
    ownerid = response.ownerid

    /* Validate owner id. */
    if (!ownerid) {
        return `Oops! We could not find an OWNER. Please try again...`
    }

    // TODO Verify that OWNER is credited to serve this data.

    // NOTE: We will exclude NiftyArt data from this requirement.

    binSource = `https://${cid}.nexa.garden`
    // console.log('BINARY SOURCE', binSource)

    /* Request data file. */
    // FIXME Pull this data from LOCAL HOST (when in production).
    binArchive = await $fetch(binSource)
        .catch(err => console.error(err))
    // console.log('BIN ARCHIVE', binArchive.length)

    /* Validate binary archive. */
    if (binArchive) {
        return binArchive
    }

    /* Return profile id. */
    return `Oops! We could not find any asset data for [ ${tokenid} ]. Please try again...`
})
