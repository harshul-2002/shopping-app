const mongoose = require('mongoose');
const Logger = require('./core/Logger');
const {
    dbUrl, minPoolSize, maxPoolSize, selectionTimout,
} = require('./configs/database');

async function connect() {
    try {
        await mongoose.connect(dbUrl, {
            minPoolSize,
            maxPoolSize,
            serverSelectionTimeoutMS: selectionTimout,
        });
    } catch (err) {
        Logger.error(err);
    }
}

async function disconnect() {
    try {
        await mongoose.disconnect();
    } catch (err) {
        Logger.error(err);
    }
}

module.exports = {
    connect,
    disconnect,
};
