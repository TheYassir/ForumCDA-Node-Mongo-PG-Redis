const express = require('express');
const router = express.Router();
const AppController = require('./controllers/appController');
const ErrorsController = require('./controllers/ErrorsController');

router.get('/', AppController.index);
router.patch('/updatedChannel/:id', AppController.update);

router.post('/errors', ErrorsController.index);
module.exports = router;
