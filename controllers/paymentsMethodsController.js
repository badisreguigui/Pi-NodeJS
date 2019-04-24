var Clients = require('../models/users')
var ApproxClients = require('../models/approximationClient')
var PaymentsInsurance = require('../models/paymentsInsurance')
var ClientsArchive = require('../models/clientsArchive')
ObjectId = require('mongodb').ObjectID;
var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live 
    'client_id': 'Af7sj5XpVPKHexMas63ZBhOv0wT03fmbRgdsTo0uTLOUeXBb7mPfKCMTxlP1pEL3eopyQXVkF3dgPUwb', // please provide your client id here 
    'client_secret': 'ELAlPJjXGrJC0IpP6YJzJlXqT_lYTTJ09IhnDd21FDSoNuQ1pqF4jGgzkslGX-dGN-dSNdr8DZsd2hw9' // provide your client secret here 
  });
//const stripe = require('stripe')('sk_test_XA950iYFnIrsHN5H9xjtp1In');

/d
/*
exports.gotostripe = function(req,res){
    var months=6; //req.params.months
    var idclient = req.params.idclient
    console.log(idclient)
    console.log(months)

    res.render('../views/index.twig', { months : months, idclient:idclient });
}

exports.paywithStripe = function(req,res){
    var months = 6; req.params.months
    var idClient = req.params.idclient
    var amount=0
    Clients.findById(idClient, function(err, p) {
        if (!p)
          console.log('pas de document malkitouch '+idClient)
        else {
          // do your updates here
          console.log('lkah')
          if(p.typeAssurance=='tout risque' && months==6){
            amount=500/2
        }
        else {
            amount=500
        }

        if(p.typeAssurance=='collision et incendie' && months==6){
            amount=300/2
        }
        else{
            amount=300
        }
        }
        var start = Date.now();
        var dateStart = new Date(start);
        var end = Date.now();
        var dateEnd=new Date(end);
        console.log(dateStart.getMonth())
        console.log(dateEnd)
        console.log(months)
        console.log(dateStart.getMonth()+Number(months))
        dateEnd.setMonth(dateStart.getMonth()+Number(months))
        console.log('new date : '+dateEnd)
        var paymentInsurance = PaymentsInsurance({
            idClient: idClient,
            totalPayed: amount,
            paymentType: months,
            datePaymentStart:dateStart,
            datePaymentEnd:dateEnd,
            });
            paymentInsurance.save()
            Clients.findById(idClient, function(err, p) {
                if (!p){
                    console.log(idClient)
                    console.log('pas de document')
                }
                else {
                  // do your updates here
                  p.etatPayment=1;
              
                  p.save(function(err) {
                    if (err)
                      console.log('error')
                    else
                      console.log('success')
                  });
                }
              });
        
            stripe.customers.create({
                email: req.body.stripeEmail,
                source: req.body.stripeToken,
                
            })
                .then(customer => stripe.charges.create({
                    amount,
                    description: 'Badis',
                    currency: 'usd',
                    customer: customer.id
                }))
                .then(charge => res.render('../views/success.twig'));
      });
}
*/
//go to Paypal (2eme fonction exécuté - scénario Badis)
exports.paywithPaypal = function (req, month, res){
    var months = month; //req.params.months
    var idClient = req;
    var amount=0; 
    //console.log(idClient); 
    Clients.findById(idClient, function(err, p) {
        if (!p)
          console.log('Erreur pour trouver le client')
        else {
          if(p.typeAssurance=='tout risque' && months==6){
            amount = 500 / 2
          }
          else {
            amount = 500
          }

          if(p.typeAssurance=='collision et incendie' && months==6){
              amount=300/2
          }
          else{
              amount=300
          }
        }
        var start = Date.now();
        var dateStart = new Date(start);
        var end = Date.now();
        var dateEnd=new Date(end);
        dateEnd.setMonth(dateStart.getMonth()+Number(months))
        var paymentInsurance = PaymentsInsurance({
            idClient: idClient,
            totalPayed: amount,
            paymentType: months,
            datePaymentStart:dateStart,
            datePaymentEnd:dateEnd,
            paymentId:null,
            etat:1,
            });
            paymentInsurance.save(function(err) {
                if (err)
                  console.log('error')
                else
                  console.log('success')
              });
      });
    
    
        
    var payment = {
            "intent": "authorize",
	"payer": {
		"payment_method": "paypal"
	},
	"redirect_urls": {
        "return_url": "http://localhost:3000/paymentsMethods/success",
        "cancel_url": "http://localhost:3000/paymentsMethods/err",
	},
	"transactions": [{
        
		"amount": {
			"total": 50,
			"currency": "USD"
		},
		"description": " a book on mean stack "
	}]
    }
	
	
	// call the create Pay method 
    createPay( payment ) 
        .then( ( transaction ) => {
            var id = transaction.id;
            console.log("transaction id : "+id)
            PaymentsInsurance.findOne({"idClient":idClient,"etat":0},  function(err, post) {
                if (!post)
                  console.log("pas de document")
                else {
                  // do your updates here
                  post.paymentId=id;
                post.save(function(err) {
                    if (err)
                      console.log('error')
                    else
                      console.log('success')
                  });
                }
              });
            var links = transaction.links;
            var counter = links.length; 
            while( counter -- ) {
                if ( links[counter].method == 'REDIRECT') {
                    var url = links[counter].href; 
                    var opn = require('opn');
                    opn(url);

                    return res.redirect( links[counter].href )
                }
            }
            console.log("successs story")
        })
        .catch( ( err ) => { 
            //console.log( err ); 
            //res.redirect('/err');
        });
}

exports.success = function (req,res){
          Clients.findById(req,  function(errr, postclient) {
            if (!postclient)
              console.log("pas de document")
            else {
              // do your updates here
              postclient.etatPayment = 1;
              postclient.etatClient = 1;
              postclient.save(function(errr) {
                if (errr)
                  console.log('error')
                else {
                  //console.log(postclient)
                }
              });
            }
          });
    //res.send("Thank you, you successfully payed your Insurance contract ")
    console.log("Thank you, you successfully payed your Insurance contract ")
}

exports.error= function (req,res){
    console.log(req.query); 
    res.send('ERROR PAYMENTS SORRY')
}
// helper functions 
var createPay = ( payment ) => {
    return new Promise( ( resolve , reject ) => {
        paypal.payment.create( payment , function( err , payment ) {
         if ( err ) {
             reject(err); 
         }
        else {
            resolve(payment); 
        }
        }); 
    });
}	