const dbUrl = process.env.DB_URL;
const maxPoolSize = process.env.DB_MAX_POOL_SIZE;
const minPoolSize = process.env.DB_MIN_POOL_SIZE;
const selectionTimout = process.env.DB_SELECTION_TIMEOUT;

module.exports = {
    dbUrl,
    maxPoolSize,
    minPoolSize,
    selectionTimout,
};
