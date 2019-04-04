var express = require('express');
var router = express.Router();
var mailController = require('../controllers/mailController');


router.get('/:id',mailController.sendMail);


module.exports = router;