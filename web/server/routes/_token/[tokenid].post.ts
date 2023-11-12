/* Import modules. */
import * as fflate from 'fflate'
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/profiles`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

// function convertUint8ArrayToBinaryString(u8Array) {
// 	var i, len = u8Array.length, b_str = "";
// 	for (i=0; i<len; i++) {
// 		b_str += String.fromCharCode(u8Array[i]);
// 	}
// 	return b_str;
// }

// function convertBinaryStringToUint8Array(bStr) {
// 	var i, len = bStr.length, u8_array = new Uint8Array(len);
// 	for (var i = 0; i < len; i++) {
// 		u8_array[i] = bStr.charCodeAt(i);
// 	}
// 	return u8_array;
// }

/**
 * Read File
 *
 * Reads a stream body and returning a typed array.
 */
const readFile = (_req) => {
    /* Return async promise. */
    return new Promise((resolve, reject) => {
        /* Initialize chunks. */
        let chunks = new Uint8Array()
        let data

        /* Handle (stream) data. */
        _req.on('data', (_data) => {
            // console.log('RAW DATA', _data)
            /* Convert data. */
            data = new Uint8Array(_data)
            // console.log('DATA', data)

            /* Append data to chunks. */
            chunks = new Uint8Array([
                ...chunks,
                ...data,
            ])
        })

        /* Handle (stream) completion. */
        _req.on('end', () => {
            resolve(chunks)
        })

        _req.on('error', reject)
    })
}

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let availSpace
    let body
    let buckets
    let data
    let error
    let filesize
    let form
    let metadata
    let options
    let pinned
    let profile
    let profileid
    let response
    let result
    let session
    let sessionid
    let tokenid

    const req = event.node.req
    // console.log(req)

    /* Request file content. */
    const fileContent = await readFile(req)
    console.log('FILE CONTENT', fileContent, typeof fileContent, fileContent.length)

    try {
        const unzipped = fflate.unzipSync(fileContent)
        console.log('UNZIPPED', unzipped)
    } catch (err) {
        console.error(err)
    }

    return { ok: true }

    /* Request session. */
    // session = await sessionsDb
    //     .get(sessionid)
    //     .catch(err => {
    //         console.error(err)
    //         error = err
    //     })
    // console.log('SESSION', session)

    /* Set profile id. */
    // NOTE: This is typically a (33-byte) public key.
    // profileid = session.profileid
    // console.log('PROFILE ID', profileid)


    return unzipped
})
