var express = require('express');
var router = express.Router();
var textSpeechController = require('../controllers/textSpeechController'); 


router.get('/say',textSpeechController.say);


module.exports = router;
