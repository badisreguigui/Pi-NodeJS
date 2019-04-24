var express = require('express');
var router = express.Router();
var chatController = require('../controllers/ChatController'); 

router.get('/listMsgs', chatController.listMsgs);
router.get('/listDiscuss', chatController.listDiscussions);
/**/
module.exports = router;