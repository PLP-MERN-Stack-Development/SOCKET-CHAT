const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { getMessages } = require('../controllers/message.controller');

router.use(authenticate);

router.get('/rooms/:roomId/messages', getMessages);

module.exports = router;