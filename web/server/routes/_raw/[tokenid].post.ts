/* Import modules. */
import * as fflate from 'fflate'
import fs from 'fs'
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'
import { binToHex } from '@nexajs/utils'

/* Initialize databases. */
const assetsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/assets`)
const pinsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/pins`)
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

    /* Validate token id. */
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
    let checksum
    let cid
    let decompressed
    let error
    let fileContent
    let fullPath
    let info
    let json
    let response
    let result
    let tokenid

    const approvedCollections = [
        'cacf3d958161a925c28a970d3c40deec1a3fe06796fe1b4a7b68f377cdb90000', // NiftyArt
        '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000', // Studio Time + Collection
    ]

    const req = event.node.req
    // console.log(req)

    /* Set token id. */
    tokenid = event.context.params.tokenid

    /* Validate collection. */
    if (!approvedCollections.includes(tokenid.slice(0, 64))) {
        return `Oops! This collection is NOT supported on this platform.`
    }

    /* Request file content. */
    fileContent = await readFile(req)
    console.log('FILE CONTENT', fileContent, typeof fileContent, fileContent.length)

    checksum = sha256(sha256(fileContent))
    console.log('CHECKSUM', binToHex(checksum))

    try {
        decompressed = fflate.unzipSync(fileContent)
        console.log('DECOMPRESSED', decompressed)

        fullPath = process.env.IPFS_STAGING + tokenid
        console.log('FULL PATH', fullPath)

        /* (Synchronous) file write. */
        fs.writeFileSync(fullPath, fileContent)

        /* Pin (save) to IPFS. */
        result = await doPin(tokenid, fileContent)
        console.log('PIN RESULT', result)

        if (result && typeof result === 'string' && result[0] === 'b') {
            /* Set content id (CID). */
            cid = result
        }
    } catch (err) {
        console.error(err)
    }

    /* Validate token (JSON) document. */
    if (decompressed['info.json']) {
        try {
            /* Initialize text decoder. */
            const utf8decoder = new TextDecoder()

            /* Decode info document (bytes). */
            info = utf8decoder.decode(decompressed['info.json'])
            // console.log('INFO', info, typeof info)

            /* Parse JSON. */
            json = JSON.parse(info)
            // console.log('JSON', json)
        } catch (err) {
            console.error(err)
        }
    }

    /* Validate JSON. */
    if (!json) {
        throw new Error('Oops! Failed to recognize the token description document (TDD).')
    }

    /* Build asset package. */
    const assetPkg = {
        _id: tokenid,
        tokenid: 'TBD',
        cid,
        shareid: 'TBD',
        niftyVer: json.niftyVer,
        title: json.title,
        series: json.series,
        author: json.author,
        keywords: json.keywords,
        category: json.category,
        appuri: json.appuri,
        info: json.info,
        data: json.data,
        license: json.license,
        createdAt: moment().unix(),
    }
    console.log('ASSET PKG', assetPkg)

    /* Insert new asset. */
    response = await assetsDb
        .put(assetPkg)
        .catch(err => console.error(err))
    // console.log('ASSETS RESPONSE', response)

    /* Build (IPFS) pin package. */
    const pinPkg = {
        _id: cid,
        ownerid: true, // FOR DEV PURPOSES ONLY
        size: 0,
        filepath: `/export/${tokenid}`,
        newFilename: tokenid,
        mimetype: 'application/zip',
        // mtime: "2023-09-24T22:17:04.301Z",
        originalFilename: tokenid,
        createdAt: moment().unix(),
        updatedAt: moment().unix(),
        expiresAt: 0
    }

    /* Insert new (IPFS) pin. */
    response = await pinsDb
        .put(pinPkg)
        .catch(err => console.error(err))
    // console.log('PINS RESPONSE', response)

    /* Return success. */
    return {
        assetPkg,
        pinPkg,
        error,
    }
})
