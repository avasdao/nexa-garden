/* Import modules. */
import formidable from 'formidable'
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const rainmakerProfilesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_profiles`)
const rainmakerTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_txs`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let address
    let body
    let campaign
    let campaignid
    let fields
    let files
    let form
    let options
    let profiles
    let receivers
    let response
    let txidem
    let assetPkg

    options = {
        uploadDir: '/export',
        maxFieldsSize: 1 * 1024 * 1024, // NOTE: 1MiB
        maxFileSize: 2 * 1024 * 1024, // NOTE: 2MiB
        maxTotalFileSize: 50 * 1024 * 1024, // NOTE: 50MiB
        multiples: true,
    }
    console.log('FORMIDABLE OPTIONS', options)

    /* Initialize Formidable library. */
    form = formidable(options)

    response = await form.parse(event.node.req)
        .catch(err => console.error(err))
    console.log('RESPONSE', response)

    if (!response?.length) {
        return null
    }

    return response

    campaign = body.campaign
    campaignid = campaign.id

    receivers = body.receivers

    txidem = body.txidem

    profiles = receivers.map(_receiver => {
        let profileid

        profileid = sha256(`${campaignid}:${_receiver.address}`)

        return profileid
    })

    for (let i = 0; i < profiles.length; i++) {
        const profileid = profiles[i]

        const profile = await rainmakerProfilesDb
            .get(profileid)
            .catch(err => console.error(err))
        // console.log('PROFILE-1', profile)

        /* Validate profile. */
        if (profile) {
            profile.txs.push(txidem)
            profile.updatedAt = moment().unix()
            // console.log('PROFILE-2', profile)

            response = await rainmakerProfilesDb
                .put(profile)
                .catch(err => console.error(err))
            // console.log('UPDATE PROFILE', response)
        }
    }

    txPkg = {
        _id: txidem,
        campaignid,
        profiles,
        createdAt: moment().unix(),
    }
    // console.log('TX PKG', txPkg)

    response = await rainmakerTxsDb
        .put(txPkg)
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    return txidem
})
