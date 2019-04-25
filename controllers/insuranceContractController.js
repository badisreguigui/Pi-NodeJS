var InsuranceContract = require('../models/insuranceContract');
const userController=require('../api/users');
const dossierController=require('../controllers/dossierInscriptionsController');
var Conducteur=require('../models/conducteur');
var Garantie=require('../models/garantie');
var myPolicy=null;
var User=require('../models/users');
var result = null;

exports.addInsuranceContract = async (req, res)=>{

    var user=userController.connectedUser;
    var dossierInscription=dossierController.policyDossierInscription;
    var typeAssurance=dossierController.insuranceType;
    var policyCost=dossierController.policyCost;
    console.log(typeAssurance);
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
        deductible:250,
        insuranceType:typeAssurance
    });
  
    insuranceContract.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })

    //
}

exports.verifyPolicy = async (req, res) =>
{
     myPolicy= await getMyPolicy(req.body.idPolicy);

    var rep1 = "je veut annuler mon contract assurance";
   
    var rep2 = "je change d'assureur";
    var rep3="je vais vendre ma voiture";
    var rep4="je vais demenager";
    var rep5="changement de situation conjugale";
    var rep6="retraite professionnelle";
    

       console.log(myPolicy);
        var today = new Date(Date.now());
        var diff = Math.floor(myPolicy.policyStartDate.getTime() - today.getTime());
        var day = 1000 * 60 * 60 * 24;
        var answer="";
        var days = Math.floor(diff / day);
        var months = Math.floor(days / 31);
        var years = Math.floor(months / 12);
        var positiveDays = Math.abs(days)
        if(req.body.msg=="je veut annuler mon contract assurance")
        {
            if(positiveDays>60)
            {
                    answer="Desolée mais vous avez depasse 60 jour , vous ne pouvez pas annuler votre contrat tout de suite, auriez vous une raison ";
            }
            else if (positiveDays<60)
            {
                 answer="oui c est possible , mais vous devez envoyer une lettre de résiliation et votre assurance sera résilié 15 jours aprés le recu de la date ,  Merci ";
            }
        }
            
        
      
     res.send(answer);
}

exports.verifyReason = async (req, res) =>
{
    //var myPolicy = await getMyPolicy(req.body.idPolicy);

    var rep2="je change d assureur";
    var rep3="je vais vendre ma voiture";
    var rep4="je vais demenager";
    var rep5="changement de situation conjugale";
    var rep6="retraite professionnelle";
    var answer="";

    if(req.body.raison==rep6||req.body.raison==rep4||req.body.raison==rep5)
    {
    answer="vous avez 3 mois pour notifier l'assureur et votre demande sera achevé 1 mois aprés le recu de la lettre de résiliation ";
    }
    else if (req.body.raison==rep3)
    {
    answer="votre police d'assurance sera effacé 10 jour aprés envoie de lettre";
    }
    else if (req.body.raison==rep2)
    {
        answer="veuillez informer par courrier simple votre courant assureur de votre résiliation";
    }
    
    res.send(answer);
    
}


async function getMyPolicy(id)
{
    return new Promise(resolve => {
        InsuranceContract.findById(id,function(err,InsuranceContract){
            return resolve(InsuranceContract);
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

async function getUser(id)
{
    return new Promise(resolve => {
        User.findById(id,function(err,user){
            return resolve(user);
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

async function getAllInsurances()
{
    return new Promise(resolve => {
        InsuranceContract.find(function(err,insurances){
            return resolve(insurances);
        });
    })
}




exports.afficherInsuranceContracts = function (req, res) {
    InsuranceContract.find(function (err,InsuranceContracts) {
        if(err)
            res.send(err);
        if(!InsuranceContracts)
            res.status(404).send();
        else
        
            res.json(InsuranceContracts);

    })
}

exports.getGarantiesFromInsuranceContracts = function (req, newlist,res) {
    var garantiesInsurance=[];
  // console.log(newlist.length);
    var data=[];
    var myData=[];
   
    newlist.forEach(element => {
        if(element.insuranceCoverages.length!=0){
            garantiesInsurance.push(element.insuranceCoverages);
        }
    });
    
    var cpt=1;
   
    for (var i = 0; i < garantiesInsurance.length; i++)
     { 
         var newData=[];
      for (var j = 0; j< garantiesInsurance[i].length; j++)
       { 
           var jsonData={};
           jsonData['label']=garantiesInsurance[i][j];
          
           jsonData['y']=cpt;
        
           newData.push(jsonData);
       }
      
       myData=[...newData];
      
      cpt++;
     }
   
         data.push(myData); 
  
       
    return data;
    
    
}


exports.filterInsuranceList = async (req, newlist,res)=>{
    var newInsuranceList=[];
    var data=[];
    var myData=[];
  //var testData=await getAllInsurances();
  var newData=[];
  for (var i = 0; i < newlist.length; i++)
  { 
    var fetchedUser=await getUser(newlist[i].policyholder);
    var jsonData={};
    jsonData['insuranceHolderName']=fetchedUser.name;
    jsonData['insuranceType']=newlist[i].insuranceType;
    jsonData['insurancePrice']=newlist[i].insurancePrice;
    jsonData['insuranceCoverages']=newlist[i].insuranceCoverages;
   
 
    newData.push(jsonData);
  }
  

   /* for (var i = 0; i < garantiesInsurance.length; i++)
     { 
         var newData=[];
      for (var j = 0; j< garantiesInsurance[i].length; j++)
       { 
        var jsonData={};
           jsonData['label']=garantiesInsurance[i][j];
          
           jsonData['y']=cpt;
        
           newData.push(jsonData);
       }
      
       myData=[...newData];
      
      cpt++;
     }*/
   
        
  
       
    return newData;
    
    
}

exports.mostPurchasedInsurances = async (req, newlist,res)=>
{
    var newInsuranceList=[];
    var data=[];
    var myData=[];
    //var testData=await getAllInsurances();
  var newData=[];
  var cpt=0;
  var cptt=0;
  var jsonData={'Assurance tiers':0,'Assurance tout risques':0,'Assurance intermediaire':0};
 
  for (var i = 0; i < newlist.length; i++)
  { 
    
    if(newlist[i].insuranceType=="tiers")
    {
       
    jsonData['Assurance tiers']=jsonData['Assurance tiers']+1; 
    
    }
    else if (newlist[i].insuranceType=="tout risques")
    {
        
       jsonData['Assurance tout risques']=jsonData['Assurance tout risques']+1; 
    }
    else if (newlist[i].insuranceType=="intermediaire"){
        jsonData['Assurance intermediaire']= jsonData['Assurance intermediaire']+1; 
    }
  
    
   
   
  }
  newData.push(jsonData);

  
       
    return newData;
    
    
}