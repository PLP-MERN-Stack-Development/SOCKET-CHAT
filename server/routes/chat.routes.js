const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { createRoom, getRooms } = require('../controllers/chat.controller');

router.use(authenticate);

router.post('/rooms', createRoom);
router.get('/rooms', getRooms);

module.exports = router;