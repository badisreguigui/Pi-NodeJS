var InsuranceContract = require('../models/insuranceContract');
const userController=require('../api/users');
const dossierController=require('../controllers/dossierInscriptionsController');
var Conducteur=require('../models/conducteur');
var Garantie=require('../models/garantie');

exports.addInsuranceContract = async (user, res)=>{
/
    //var user = userController.connectedUser;
    var dossierInscription=dossierController.policyDossierInscription;
    var policyCost=dossierController.policyCost;
    var fetchedConducteur= await getConducteur(dossierInscription.conducteur);
    var fetchedGaranties= await getGarantie(dossierInscription.garantie);
    var coverageList=[];
    var i;
   // console.log("FETCHED GUANRANTIES ===>"+fetchedConducteur);
    if(fetchedGaranties.vol==true)
    {
        coverageList.push("Garantie Anti Vol");
    }
    if(fetchedGaranties.incendie==true)
    {
        coverageList.push('Garantie Incendie');
    }
    if(fetchedGaranties.dommageVehicule==true)
    {
        coverageList.push('Garantie dommage Vehicule')
    }
    if(fetchedGaranties.securitePassagers==true)
    {
        coverageList.push('Garantie securite des passagers ')
    }
    if(fetchedGaranties.brisDeGlace==true)
    {
        coverageList.push('Garantie brise de glace')
    }
    if(fetchedGaranties.volPosteRadio==true)
    {
        coverageList.push('Garantie anti vole poste radio')
    }
    if(fetchedGaranties.nature==true)
    {
        coverageList.push('Garantie nature');
    }
    if(fetchedGaranties.assistanceAuto==true)
    {
        coverageList.push('Garantie Assistance Auto')
    }


var numberOfDays=null;
if(dossierInscription.dureeAsurance=='TRIMESTRE')
{
numberOfDays=90
}
else if (dossierInscription.dureeAsurance=='SEMESTRE')
{

    numberOfDays=180
}
else if( dossierInscription.dureeAsurance=='ANNUEL')
{
    numberOfDays=360
}

var myDate = new Date(Date.now());
myDate.setDate(myDate.getDate() + numberOfDays);
    var insuranceContract=new InsuranceContract({
        policyholder:user.id,
        insurancePrice:1200,
        policyEndDate:myDate,
        insuranceCoverages:coverageList,
        deductible:250
    });
  
    insuranceContract.save(function (err,todo) {
       console.log("you are successfully subscribed. Your insurance price is " + 1200 + " for 180 days" + " days. And your insurance coverage is " + coverageList ); 
       return "you are successfully subscribed. Your insurance price is " + 1200 + " for 180 days" + " days. And your insurance coverage is " + coverageList ;
    })
    
    //
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