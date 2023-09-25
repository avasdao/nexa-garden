export default defineEventHandler(async (event) => {
    /* Set token id. */
    const tokenid = event.context.params.tokenid

    /* Return profile id. */
    return 'Looking for -> ' + tokenid
})
