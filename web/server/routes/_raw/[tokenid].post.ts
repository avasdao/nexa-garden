/* Import modules. */
import * as fflate from 'fflate'
import fs from 'fs'
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

const doPin = async (_tokenid, _data) => {
    // console.log('DATA', _data)

    /* Initialize locals. */
    let cid
    let commandToRun
    let data
    let outputPath
    // let outputResponse
    let pipePath
    let timeout
    let timeoutStart
    let wstream

    /* Validate token id . */
    if (!_tokenid) {
        throw new Error('Oops! No token id provided.')
    }

    pipePath = '/gateway/pipe'
    outputPath = '/gateway/output'
    commandToRun = `docker exec ipfs_host ipfs add -Q --cid-version 1 /export/${_tokenid}`

    console.log('delete previous output')
    if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath)
    }

    console.log('commandToRun', commandToRun)
    wstream = fs.createWriteStream(pipePath)
    wstream.write(commandToRun)
    wstream.close()

    return new Promise((resolve, reject) => {
        console.log('waiting for output...') //there are better ways to do that than setInterval

        timeout = 10000 //stop waiting after 10 seconds (something might be wrong)

        timeoutStart = Date.now()

        const myLoop = setInterval(() => {
console.log('looping...')
            if (Date.now() - timeoutStart > timeout) {
                clearInterval(myLoop)

                console.error('timed out')

                reject('timed out')
            } else {
                //if output.txt exists, read it
                if (fs.existsSync(outputPath)) {

                    cid = fs.readFileSync(outputPath).toString().trim()
                    console.log('CID', cid.length, cid)

                    /* Validate CID. */
                    // TODO Perform a "proper" validation.
                    if (cid.length > 50) {
                        clearInterval(myLoop)

                        if (fs.existsSync(outputPath)) {
                            fs.unlinkSync(outputPath) //delete the output file
                        }

                        /* Resolve CID. */
                        resolve(cid)
                    }
                }
            }
        }, 100)
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
    let fullPath
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

    /* Set token id. */
    tokenid = event.context.params.tokenid

    /* Request file content. */
    const fileContent = await readFile(req)
    console.log('FILE CONTENT', fileContent, typeof fileContent, fileContent.length)

    try {
        const unzipped = fflate.unzipSync(fileContent)
        console.log('UNZIPPED', unzipped)

        fullPath = process.env.IPFS_STAGING + tokenid
        console.log('FULL PATH', fullPath)

        /* (Synchronous) file write. */
        fs.writeFileSync(fullPath, fileContent)

        /* Pin (save) to IPFS. */
        result = await doPin(tokenid, fileContent)
        console.log('PIN RESULT', result)

        // TOOO Database inserts.

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
