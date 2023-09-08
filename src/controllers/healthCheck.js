const Logger = require('../core/Logger');

const echo = (req, res) => {
    Logger.info('Received Echo');
    res.send('Recived Echo');
};

const healthcheck = (req, res) => {
    Logger.info('Received health check');
    res.send('Received Echo');
};

module.exports = {
    echo,
    healthcheck,
};
