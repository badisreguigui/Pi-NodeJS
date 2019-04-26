var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Accident = require('../models/Accident');
var claimController = require('../controllers/claimController'); 
var AIController = require('../controllers/AIAgentController'); 

router.post('/AddAccident', claimController.ajouterAccident);
router.post('/AddClaim/:id', claimController.ajouterClaim);
router.get('/getAccident/:id', claimController.findAccident);
router.post('/test', function(req, res){
    var accident = new Accident({
        dateTime: "date",
        address: "nabeul"
    })
    claimController.ajouterAccident(accident, res); 
});

router.post('/AI', AIController.mainAI);
router.post('/newIntent', AIController.newIntent);
router.get('/listIntents', AIController.listIntents);
router.get('/listNoeuds', AIController.listNoeuds);
router.post('/newNoeud', AIController.newNoeud);
/**/
module.exports = router;