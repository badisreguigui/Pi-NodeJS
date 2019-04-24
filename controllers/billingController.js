var Clients = require('../models/users')
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
    var id = req;
        Clients.findById(id).exec(function(reqf,resf,errf){
           if (errf) console.log(errf);
           
                if(resf!=null){
                    if(resf.etatPayment == 0){
                      console.log('You have your payments waiting for your ' + resf.typeAssurance + ' insurance. The amount is of 350 DT that you will have to pay before this date: 30-04-2019');
                    }
                    else
                      console.log('No Payments Needed: ' + resf.typeAssurance);
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
