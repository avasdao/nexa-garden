export default defineEventHandler((event) => {
    const projectid = process.env.HELIA_DIR
    const projectName = process.env.UPLOAD_DIR

    /* Build project. */
    const project = {
        projectid,
        projectName,
    }

    /* Return project details. */
    return project
})
