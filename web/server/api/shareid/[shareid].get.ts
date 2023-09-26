/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const assetsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/assets`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let response
    let shareid

    /* Set share id. */
    shareid = event.context.params.shareid

    /* Validate share id. */
    if (!shareid) {
        return `Oops! Please provide a share id.`
    }

    /* Request asset. */
    response = await assetsDb.query('api/byShareid', {
        key: shareid,
        include_docs: true,
    })
        .catch(err => console.error(err))

    /* Validate response. */
    if (!response?.rows[0].id) {
        return `Oops! We could not find [ ${shareid} ]. Please try again...`
    }

    /* Return asset id. */
    return response.rows[0].id
})
