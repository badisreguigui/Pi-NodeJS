var express = require('express');
var router = express.Router();
var Message = require('../models/messages');
var messagesController = require('../controllers/messagesController');

router.post('/addMessage',messagesController.sendMessage);
router.get('/myMessages',messagesController.myMessages);

module.exports = router;