/* Import modules. */
import formidable from 'formidable'
import fs from 'fs'
// import { createHelia } from 'helia'
// import { unixfs } from '@helia/unixfs'
// import { FsBlockstore } from 'blockstore-fs'
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

const init = async () => {
    // helia = await createHelia({
    //     // blockstore,
    // })
    // console.log('helia', helia)

    // await helia.stop()
}

const cleanup = async () => {
    // await helia.stop()
}

const getPin = async (_cid) => {
    // const fs = unixfs(helia)
    // // console.log('FS', fs);

    // const decoder = new TextDecoder()
    // let text = ''

    // for await (const chunk of fs.cat(_cid)) {
    //     text += decoder.decode(chunk, {
    //         stream: true
    //     })
    // }

    // console.log('Added file contents:', text)

    // return text
}

const doPin = async (_data) => {
    // console.log('DATA', _data)

    /* Initialize locals. */
    let cid
    let commandToRun
    let data
    let filename
    let outputPath
    // let outputResponse
    let pipePath
    let timeout
    let timeoutStart
    let wstream

    /* Validate (filename) data. */
    if (_data?.newFilename) {
        filename = _data?.newFilename
    }

    /* Validate filename. */
    if (!filename) {
        throw new Error('Oops! No filename provided.')
    }

    pipePath = '/gateway/pipe'
    outputPath = '/gateway/output'
    commandToRun = `docker exec ipfs_host ipfs add -Q --cid-version 1 /export/${filename}`

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

init()


export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let data
    let form
    let metadata
    let options
    let profileid
    let response
    let result
    let session
    let sessionid

    options = {
        uploadDir: process.env.IPFS_STAGING,
        maxFieldsSize: 1 * 1024 * 1024,         //   1 MiB
        maxFileSize: 100 * 1024 * 1024,         // 100 MiB
        maxTotalFileSize: 1024 * 1024 * 1024,   //   1 GiB
        multiples: true,
    }
    console.log('FORMIDABLE OPTIONS', options)

    /* Initialize Formidable library. */
    form = formidable(options)

    response = await form.parse(event.node.req)
        .catch(err => {
            console.error(err)

            if (err?.code === 1016) {
                return `Oops! You've exceeded the maximum file size (100 MiB).`
            }
        })
    console.log('RESPONSE', response)

    if (!response?.length) {
        return null
    }

    /* Set metadata. */
    metadata = response[0]
    console.log('METADATA', metadata)

    /* Set session id. */
    sessionid = metadata?.sessionid
    console.log('SESSION ID', sessionid)

    /* Validate session id. */
    if (!sessionid || typeof sessionid === 'undefined') {
        return {
            error: 'Session NOT found!',
            body,
        }
    }

    /* Request session. */
    session = await sessionsDb
        .get(sessionid)
        .catch(err => {
            console.error(err)
            error = err
        })
    console.log('SESSION', session)

    /* Set profile id. */
    // NOTE: This is typically a (33-byte) public key.
    profileid = session.profileid
    console.log('PROFILEID', profileid)

    /* Set (binary) file data. */
    data = response[1]?.data[0]

    result = await doPin(data)
        .catch(err => console.error(err))
    console.log('PIN RESULT', result)

    response.push(result)

    // result = await getPin(result)
    //     .catch(err => console.error(err))
    // console.log('GET PIN RESULT', result)

    return response
})
