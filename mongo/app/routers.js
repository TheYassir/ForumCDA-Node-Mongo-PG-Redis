const express = require('express');
const router = express.Router();
const ChannelsController = require('./controllers/ChannelsController');
const ThreadsController = require('./controllers/ThreadsController');
/**
 * @route GET /channels
 */
router.get('/channels', ChannelsController.index);
/**
 * @route POST /channels
 */
router.post('/channels', ChannelsController.store);

/**
 * @route GET /channels/archives
 */
router.get('/channels/archives', ChannelsController.archives);

/**
 * @route PATCH /channels/channelId
 */
router.patch('/channels/:channelId', ChannelsController.update);

/**
 * @route GET /channel/channelId/threads
 */
router.get('/channel/:channelId/threads', ChannelsController.show);

/**
 * @route GET /threads
 */
router.get('/threads', ThreadsController.index);

module.exports = router;
