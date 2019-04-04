var DossierInscription = require('../models/dossierInscription');
var Conducteur = require('../models/conducteur');
var Voiture = require('../models/voiture');
var Stationnement = require('../models/stationnement');
var Garantie = require('../models/garantie');


/* exports.ajouterDossierInscription = function (req, res){
    var dossierInscription = new DossierInscription(req.body);
    dossierInscription.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
} */

// inscription 
exports.ajouterDossierInscription = function (req, res){
    // var dossierInscription = new DossierInscription(req.body);
     var conducteur = new Conducteur(req.body.conducteur);
     var voiture=new Voiture(req.body.vehicule);
     var stationnement=new Stationnement(req.body.stationnement);
     var garantie=new Garantie(req.body.garantie);
     conducteur.save().then(()=>{
         voiture.save().then(()=>{
             stationnement.save().then(()=>{
                 
                 garantie.save().then(()=>{
                     var dossierInscription = new DossierInscription({
                         conducteur:conducteur.id,
                         vehicule:voiture.id,
                         stationnement:stationnement.id,
                         garantie:garantie.id,
                         dureeAsurance:req.body.dureeAsurance
                     });
                     dossierInscription.save();
                     res.send(dossierInscription);
                 })
             })
         })
     })

     
   
 }

exports.afficherDossierInscription = function (req, res){
    DossierInscription.find(function (err,dossierInscriptions) {
        if(err)
            res.send(err);
        if(!dossierInscriptions)
            res.status(404).send();
        else
            res.json(dossierInscriptions);

    })
}

exports.afficherDossierParId = function (req,res){
    var id = req.params.id;
    DossierInscription.findById(id).exec(function(err,dossierInscription){
        if(err)
            res.status(400).send(err);
        if(!dossierInscription)
            res.status(404).send();
        else
            res.json(dossierInscription);
    })   
}




exports.supprimerDossierParId = function (req,res){
    var id = req.params.id;
    DossierInscription.findByIdAndRemove(id,function(err,dossierInscription){
        if(err)
            res.status(400).send(err);
        else
            res.send();
    })   
}

async function getDossier(id)
{
    return new Promise(resolve => {
        DossierInscription.findById(id,function(err,dossierInscription){
            return resolve(dossierInscription);
        });
    })
}

async function getVoiture(id)
{
    return new Promise(resolve => {
        Voiture.findById(id,function(err,voiture){
            return resolve(voiture);
        });
    })
}

async function getStationnement(id)
{
    return new Promise(resolve => {
        Stationnement.findById(id,function(err,stationnement){
            return resolve(stationnement);
        });
    })
}

async function getConducteur(id)
{
    return new Promise(resolve => {
        Conducteur.findById(id,function(err,conducteur){
            return resolve(conducteur);
        });
    })
}

async function getGarantie(id)
{
    return new Promise(resolve => {
        Garantie.findById(id,function(err,garantie){
            return resolve(garantie);
        });
    })
}

//afficher le dossier par l'id user
exports.afficherDossierParIdConducteur = async (req,res) => {
    var id = req.params.id;
    var c = await getConducteur(id);
    DossierInscription.findOne({conducteur: c.id}, function(err,dossierInscription) 
    { 
            if(err)
            res.status(400).send(err);
            if(!dossierInscription)
            res.status(404).send();
            else
            res.json(dossierInscription); 
    }); 
}

 async function description(score) {
    return new Promise(resolve => {
        var description ;
        if(score<40)
        {
            description = "mauvais";
        }
        else if((score>=40)&&(score<60))
        {
            description = "pas mal";
        }
        else if(score>60)
        {
            description = "tres bien";
        }
        else
        {
            description = "recommencez";
        }
        return resolve(description);
        
    });  
} 

async function CalculerCout(suggestion,score) {
    return new Promise(resolve => {
        var cout = 100;
        console.log("cout generale : "+cout+" dinars");

        if(suggestion=="intermediaire")
        {
            cout+=50;
            if(score<40)
            {
                cout+=75;
            }
            else if (score>60)
            {
                cout+=25;
            }
            else
            {
                cout+=25;
            }
            console.log("cout intermediaire : "+cout+" dinars");
        }
        else if (suggestion=="tous risques")
        {
            cout += 100;
            if(score<40)
            {
                cout+=75;
            }
            else if (score>60)
            {
                cout+=25;
            }
            else
            {
                cout+=25;
            }
            console.log("cout tous risque : "+cout+" dinars");
        }
        else
        {
            if(score<40)
            {
                cout+=75;
            }
            else if (score>60)
            {
                cout+=25;
            }
            else
            {
                cout+=25;
            }
            console.log("cout tiers : "+cout+" dinars");
        }
        
        return resolve(cout);
        
    });  
} 


/* PARKING : 'PARKING',
VOIE_PUBLIQUE: 'VOIE_PUBLIQUE',
GARAGE : 'GARAGE' */

/* PRIVE : 'PRIVE',
TRAVAIL : 'TRAVAIL' */
//2eme fonction 
/* "numero de dossier": "5ca51bba1686d305fb56dd79",
    "score (%) ": 38,
    "suggestion du type d'assurance ": "tous risques",
    "reponse": "mauvais",
    "cout personnalisé en dinars": 275 */
exports.getD = async (req,res) => {
    var dossier = await getDossier(req.params.id);  
    var vehicule = await getVoiture(dossier.vehicule);
    var stationnement = await getStationnement(dossier.stationnement);
    var garantie = await getGarantie(dossier.garantie);
    var conducteur = await getConducteur(dossier.conducteur);

    var dateNow = new Date().getFullYear();
    var miseCirculation = dateNow-vehicule.miseCirculation.getFullYear();
    var permis = dateNow-conducteur.dateObtentionDuPermis.getFullYear();
    var tousRisque = 0;
    var tiers = 0;
    var intermediare = 0;

    var score = 0;

    if((conducteur.age>=18)&&(conducteur.age<20))
    {
        score = score + 3;
        tousRisque+=1;
    }
    if((conducteur.age>=20)&&(conducteur.age<50))
    {
        score +=4;
        tiers+=1;
    }
    if((conducteur.age>50))
    {
        score +=2;
        tousRisque+=1;
    } 

    if(vehicule.energie=="gazoil")
    {
        score+=2;
        tiers+=1;
    }
    if(vehicule.energie=="essence")
    {
        score+=4;
        tiers+=1;
    }
    if((vehicule.cv>=4)&&(vehicule.cv<=6))
    {
        score+=4;
        tiers+=1;
    }
    if((vehicule.cv>=7)&&(vehicule.cv<=9))
    {
        score+=3;
        intermediare+=1;
    }
    if((vehicule.cv>=10)&&(vehicule.cv<=13))
    {
        score+=2;
        tousRisque+=1;
    }
    if(stationnement.tStationnement=="PARKING")
    {
        score+=3;
        tiers+=1;
    }
    if(stationnement.tStationnement=="GARAGE")
    {
        score+=4;
        tiers+=1;
    }
    if(stationnement.tStationnement=="VOIE_PUBLIQUE")
    {
        score+=2;
        tousRisque+=1;
    }
    if(stationnement.tDeplacement=="PRIVE")
    {
        score+=4;
        tiers+=1;
    }
    if(stationnement.tDeplacement=="TRAVAIL")
    {
        score+=2;
        tousRisque+=1;
    }
    if(dossier.dureeAsurance=="TRIMESTRE")
    {
        score+=2;
    }
    if(dossier.dureeAsurance=="SEMESTRE")
    {
        score+=3;
    }
    if(dossier.dureeAsurance=="ANNUEL")
    {
        score+=4;
    }
    if(garantie.vol==true)
    {
        score+=2;
        tousRisque+=1;
    }
    if(garantie.incendie==true)
    {
        score+=2;
        tousRisque+=1;
    }
    if(garantie.dommageVehicule==true)
    {
        score+=2;
        tousRisque+=1;
        intermediare+=1;
    }
    if(garantie.securitePassagers==true)
    {
        score+=2;
        tousRisque+=1;
    }
    if(garantie.brisDeGlace==true)
    {
        score+=2;
        tousRisque+=1;
        intermediare+=1;
    }
    if(garantie.volPosteRadio==true)
    {
        score+=2;
        tousRisque+=1;
    }
    if(garantie.nature==true)
    {
        score+=2;
        tousRisque+=1;
        
    }
    if(garantie.assistanceAuto==true)
    {
        score+=2;
        intermediare+=1;
        tousRisque+=1;
        intermediare+=1;
    }
    if(garantie.vol==false)
    {
        score+=4;
        tiers+=1;
    }
    if(garantie.incendie==false)
    {
        score+=4;
        tiers+=1;
    }
    if(garantie.dommageVehicule==false)
    {
        score+=4;
        tiers+=1;
    }
    if(garantie.securitePassagers==false)
    {
        score+=4;
        tiers+=1;
    }
    if(garantie.brisDeGlace==false)
    {
        score+=4;
        tiers+=1;
    }
    if(garantie.volPosteRadio==false)
    {
        score+=4;
        tiers+=1;
    }
    if(garantie.nature==false)
    {
        score+=4;
        tiers+=1;
    }
    if(garantie.assistanceAuto==false)
    {
        score+=4;
        tiers+=1;
    }
    if(permis<2)
    {
        score+=2;
        tousRisque+=1;
    }
    if((permis>=2)&&(permis<=10))
    {
        score+=3;
        tiers+=1;
    }
    if(permis>10)
    {
        score+=4;
        tiers+=1;
    }
    if(miseCirculation<5)
    {
        score+=4;
        tousRisque+=1;
    }
    if((miseCirculation>5)&&(miseCirculation>15))
    {
        score+=2;
        tiers+=1;
    }
    if(miseCirculation>15)
    {
        score+=3;
        tiers+=1;
    }

    var reponse = await description(score);
    var suggestion;
    var array=[intermediare,tousRisque,tiers];
    var cout;

    if(intermediare==Math.max(...array))
    {
        suggestion = "intermediaire";
    }
    else if(tousRisque==Math.max(...array))
    {
    	suggestion = "tous risques";

    }
    else
    {
        suggestion = "tiers";
    }

    cout = await CalculerCout(suggestion,score);

    console.log(reponse,suggestion);
    console.log("inter "+intermediare,
                "tousRisque "+tousRisque,
                "tiers"+tiers,cout);

    res.json({"numero de dossier":dossier._id,"score (%) ":score,"suggestion du type d'assurance ":suggestion,"reponse":reponse,"cout personnalisé en dinars":cout});

}




