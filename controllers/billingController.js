var Clients = require('../models/conducteur')
var Claims = require('../models/Claim')
var ApproxClients = require('../models/approximationClient')
var PaymentsInsurance = require('../models/paymentsInsurance')
var ClientsArchive = require('../models/clientsArchive')

ObjectId = require('mongodb').ObjectID;

exports.home =  function (req, res) {
    res.render('../views/index.twig');
}

//check Payment Status (1er fonction exécuté - scénario Badis)
exports.getClientPaymentEtat =  function (req, res) {

    var id = req.params.id
    
        Clients.findById(id).exec(function(reqf,resf,errf){
           if (errf) console.log(errf);
           
                if(resf!=null){
                    if(resf.etatPayment==0){
                        //res.render('index.twig',{client:resf})  
                      
                        res.send('you have payments Waiting : '+resf.typeAssurance)                  
                    }
                    else
                        res.send("No Payments Needed")
                }
    
           
                if(resf==null){
                  console.log('no response')
                  return false;
                }
        })
}

//check Contract Dates (3eme fonction exécuté - scénario Badis)

exports.checkPayment = function(req,res){
    var dateNow = Date.now()
    var today = new Date(dateNow)
    PaymentsInsurance.findOne({"idClient":req.params.id},  function(err, post) {
        if(post==null ){
            res.send('you dont have any payments yet')            
        }
        else{
        console.log( post );
        var diff = Math.floor(post.datePaymentEnd.getTime() - today.getTime());
        var day = 1000 * 60 * 60 * 24;

        var days = Math.floor(diff / day);
        var months = Math.floor(days / 31);
        var years = Math.floor(months / 12);
        console.log(days)
        console.log(months)
        console.log(years)
        
        if (days>=0 || months>=0 ){
            res.send("You still have "+days+" days => Timer : "+years+" year || "+months+" months || "+days+" days")
        }
        else{
            if(days>Number(-14)){
                var positiveDays = Math.abs(days);
                res.send("You Have "+positiveDays+" days to pay")
                Clients.findById(req.params.id, function(err, p) {
                    if (!p)
                      console.log('pas de document')
                    else {
                      // do your updates here
                      p.etatPayment=0;
                  
                      p.save(function(err) {
                        if (err)
                          console.log('error')
                        else
                          console.log('success')
                      });
                    }
                  });
            }
            else{
                res.send("Sorry , not our client anymore ,you need to pay your insurance")
                
                Clients.findById(req.params.id, function(err, p) {
                    if (!p)
                      return next(new Error('Could not load Document'));
                    else {
                      // do your updates here
                      p.etatClient=0;
                      console.log(p.etatClient)
                      p.save(function(err) {
                        if (err)
                          console.log('error')
                        else
                          console.log('success')
                      });
                    }
                  });
            }
            
        }
    }
      });
}
//get total payed by insurance (4eme fonction exécuté - scénario Badis)

exports.getTotalEstimated = function (req,res){
    var total = 0;
    var id = req.params.id
    var idclaim = req.params.idClaim

    Clients.findById(id).exec(function(reqf,resf,errf){
       if (errf) console.log(errf);
       
       Claims.findById(idclaim).exec(function(reqclaim,resclaim,errclaim){
        
        if(resf!=null){
            
          if(resclaim!=null){
            console.log('claim here')
            console.log(resclaim.damageEstimation)
            if(resf.typeAssurance=='collision et incendie'){
              total = resclaim.damageEstimation*0.4;
              console.log('ok coll')
            }
            else if(resf.typeAssurance=='tout risque'){
              total = resclaim.damageEstimation
              console.log('ok tout risque')
            }
            console.log(total)
            var approx = ApproxClients({
              idClient: resf._id,
              totalApprox: total,
              datePaymentClaimInsurance:resclaim.dateClaim,
              idClaim:idclaim
              });
            ApproxClients.findOne({"idClaim":idclaim},  function(error, postapproxClaim) {
              console.log(idclaim)
                 if(!postapproxClaim){
                   console.log('malkitouch')
                   approx.save()
                   res.send("your Total payed by your Insurance estimated : "+total);
                 }else{
                   console.log('lkitou')
                   res.send("your Total payed by your Insurance estimated : "+postapproxClaim.totalApprox)
                 }
            });
            
           
       
          }else{
            console.log('no one here')
          }
                               
                   }
                   
                   if(resf==null){
                     console.log('non existant')
                     return false;
                   }
       })
            
    })
}

function gethistoryPaymentsbyId (idclient) {
  return new Promise(function(resolve, reject) {
    PaymentsInsurance.find({"idClient":idclient,"etat":1}, function(err, docs) {
      if (err) {
        // Reject the Promise with an error
        return reject(err)
      }

      // Resolve (or fulfill) the promise with data
      return resolve(docs)
    })
  })
}

function geTotalClaimsbyId (idclient) {
  return new Promise(function(resolve, reject) {
    ApproxClients.find({"idClient":idclient}, function(err, docs) {
      if (err) {
        // Reject the Promise with an error
        return reject(err)
      }

      // Resolve (or fulfill) the promise with data
      return resolve(docs)
    })
  })
}
exports.checkhistoryPaymentsbyId = async (req,res) =>{
  let payments= await gethistoryPaymentsbyId(req.params.idclient)
  var arrayPayments = [];
  payments.forEach(function(item) {
    if (arrayPayments.indexOf(item) === -1)
    arrayPayments.push(item);
    console.log(arrayPayments.length)
});
  res.send(arrayPayments)
}


exports.checkGainClient = async (req,res) =>{
  var idclient = req.params.idclient;
  var DateNow=new Date(Date.now())
  var total=0;
  var totalClaims=0;
  let payments= await gethistoryPaymentsbyId(idclient)
  let claims= await geTotalClaimsbyId(idclient)
  var arrayPayments = [];
  payments.forEach(function(item) {
    if (arrayPayments.indexOf(item) === -1)
    arrayPayments.push(item);
    console.log(arrayPayments.length)
});
  for(var i=0;i<arrayPayments.length;i++){
    if(arrayPayments[i].datePaymentStart.getYear()==DateNow.getYear()){
      console.log(arrayPayments[i].datePaymentStart.getYear() +" "+DateNow.getYear())
      total=Number(total)+Number(arrayPayments[i].totalPayed)
      console.log(total)
    }else{
      console.log("not found")
    }
    
  }
  var arrayClaims = [];
  claims.forEach(function(item) {
    if (arrayClaims.indexOf(item) === -1){
      arrayClaims.push(item);
      console.log(arrayClaims.length)
    }
});
for(var i=0;i<arrayClaims.length;i++){
  if(arrayClaims[i].datePaymentClaimInsurance.getYear()==DateNow.getYear()){
    console.log(arrayClaims[i].datePaymentClaimInsurance.getYear() +" "+DateNow.getYear())
    totalClaims=Number(totalClaims)+Number(arrayClaims[i].totalApprox)
    console.log(totalClaims)
  }else{
    console.log("not found")
  }
  
}
var positiveTotalGained = Number(totalClaims)-Number(total);
console.log(positiveTotalGained)
if(positiveTotalGained>0){
  res.send("You Won : Total payed by you in "+DateNow.getFullYear()+" : "+total+" - Total payed by your Insurance for your claims : "+totalClaims+" = "+positiveTotalGained)

}
else{
  res.send("You Lost : Total payed by you in "+DateNow.getFullYear()+" : "+total+" - Total payed by your Insurance for your claims : "+totalClaims+" = "+positiveTotalGained)
}

}