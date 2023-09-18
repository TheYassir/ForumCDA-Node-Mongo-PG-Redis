const express = require('express');
const router = express.Router();
const appController = require('./controllers/appController');

/**
 * @route GET /logs
 * Send a request to the server send compressed files
 */
router.get('/', appController.init);

router.get('/stats', appController.parseCsv);

router.post('/logs', appController.index);

module.exports = router;
