const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const checkId = require('./validation-middlewares/checkId');
const validateChannel = require('./validation-middlewares/validateChannel');
const ChannelsController = require('./controllers/ChannelsController');
const ThreadsController = require('./controllers/ThreadsController');
const LogsController = require('./controllers/LogsController');
const ErrorsController = require('./controllers/ErrorsController');

/**
 * @route GET /api/events listen to server side events : when a thread was created, it notifies the client
 */
router.get('/events', ThreadsController.eventsHandler);

/**
 * @route POST /api/channels/create Creates a channel
 */
router.post(
    '/channels/create',
    validateChannel,
    catchErrors(ChannelsController.store)
);

/**
 * @route POST /api/threads/create Creates a Thread
 */
router.post('/threads/create', catchErrors(ThreadsController.store));

/**
 * @route GET /api/channels/:id
 * Teste de notre middleware
 */
// router.get(
//     '/channels/:channelId',
//     checkId,
//     catchErrors(ChannelsController.show)
// );
router.get('/channels/:id', checkId, catchErrors(ChannelsController.show));

/**
 * @route GET /api/logs
 * Read logs, zip logs, send to remote server
 */
router.get('/logs', catchErrors(LogsController.index));

router.get('/errors', ErrorsController.index);

module.exports = router;
