/* Import modules. */
import { getNftList } from '@nexajs/rostrum'

const NIFTY_TOKENID = 'nexa:tr9v70v4s9s6jfwz32ts60zqmmkp50lqv7t0ux620d50xa7dhyqqqcg6kdm6f' // NiftyArt.cash
const NIFTY_GROUPID = 'cacf3d958161a925c28a970d3c40deec1a3fe06796fe1b4a7b68f377cdb90000' // NiftyArt.cash


/**
 * Startup
 */
const startup = async () => {
    /* Initialize locals. */
    let result

    console.log('\n  Starting Nexa Garden Watchtower...\n')

    /* Request NFT list. */
    result = await getNftList(NIFTY_TOKENID)
        .catch(err => console.error(err))
    console.log('RESULT', result)


}

startup()
