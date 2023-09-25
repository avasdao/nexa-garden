export default defineEventHandler(async (event) => {
    /* Set token id. */
    const tokenid = event.context.params.tokenid

    /* Return profile id. */
    return `Oops! You are NOT authorized to ADD [ ${tokenid} ] asset data to this repository.`
})
