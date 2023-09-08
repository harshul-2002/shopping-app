const express = require('express');
const healthCheckController = require('../controllers/healthCheck');

const router = express.Router();

router.get('/echo', healthCheckController.echo);

router.get('/healthcheck', healthCheckController.healthcheck);

module.exports = router;
