const dotenv = require('dotenv');

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';
const port = parseInt(process.env.PORT, 10) || 8080;
const secret = process.env.SESSION_SECRET;

module.exports = {
    nodeEnv,
    port,
    secret,
};
