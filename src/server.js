const { port } = require('./configs');
const Database = require('./data-source');
const app = require('./app');
const Logger = require('./core/Logger');

(async () => {
    try {
        await Database.connect();
        Logger.info('DB Connection Open!');
        app.listen(port, () => {
            Logger.info(`Server started at port :::: ${port} `);
        });
    } catch (err) {
        await Database.disconnect();
    }
})();
