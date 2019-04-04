var Clients = require('../models/conducteur')
var ApproxClients = require('../models/approximationClient')
var PaymentsInsurance = require('../models/paymentsInsurance')
var ClientsArchive = require('../models/clientsArchive')
ObjectId = require('mongodb').ObjectID;
var paypal = require('paypal-rest-sdk');




exports.gotostripe = function(req,res){
    var months=req.params.months
    var idclient = req.params.idclient
    console.log(idclient)
    console.log(months)

    res.render('../views/index.twig', { months : months,idclient:idclient });
}

exports.paywithStripe = function(req,res){
    var months=req.params.months
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

//go to Paypal (2eme fonction exécuté - scénario Badis)
exports.paywithPaypal = function (req,res){
    var months=req.params.months
    var idClient = req.params.idclient
    var prixToutRisque=1000;
    var prixCollisionIncendie=700;
    var amount=0
    Clients.findById(idClient, function(err, p) {
        if (!p)
          console.log('pas de document malkahéch')
        else {
          if(p.typeAssurance=='tout risque' && months==6){
            amount=prixToutRisque/2
            
        }
        else if (p.typeAssurance=='tout risque' && months==12) {
            amount=prixToutRisque
        }
        else if(p.typeAssurance=='collision et incendie' && months==6){
            amount=prixCollisionIncendie/2
        }
        else if (p.typeAssurance=='collision et incendie' && months==12){
            amount=prixCollisionIncendie
        }
        else{
          console.log('no offer available')
        }
          console.log(amount)
        }
        console.log(amount)
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
            paymentId:null,
            etat:0,
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
            console.log("idclient "+idClient)
            PaymentsInsurance.findOne({"idClient":idClient,"etat":0},  function(err, post) {
                console.log("id client : "+idClient)
                if (!post)
                  console.log("pas de document")
                else {
                  // do your updates here
                  post.paymentId=id;
                    console.log(post.paymentId)
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
                    // redirect to paypal where user approves the transaction 
                    
                    return res.redirect( links[counter].href )
                }
                console.log("saaaackssss")
            }
            console.log("successs story")
        })
        .catch( ( err ) => { 
            console.log( err ); 
            res.redirect('/err');
        });
}

exports.success = function (req,res){
    console.log(req.query); 
    PaymentsInsurance.findOne({"paymentId":req.query.paymentId},  function(err, post) {
        if (!post)
          console.log("pas de document")
        else {
          // do your updates here
          post.etat=1;
            console.log(post.paymentId)
            post.save(function(err) {
            if (err)
              console.log('error')
            else
              console.log('success')
          });
          console.log(post)

          Clients.findById(post.idClient,  function(errr, postclient) {
            if (!postclient)
              console.log("pas de document")
            else {
              // do your updates here
              console.log('c bn c bn ')
              postclient.etatPayment=1;
              postclient.etatClient=1;
              postclient.save(function(errr) {
                if (errr)
                  console.log('error')
                else{
                  console.log(postclient)
                }
              });
            }
          });
        }
      });

      
    res.send("Thank you , you payed your Insurance contract ")
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