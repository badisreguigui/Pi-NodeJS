var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
var db = require('./Database/db');
const io = require('socket.io')();
var indexRouter = require('./routes/index');
var usersRouter = require('./api/users');
var claimRouter = require('./api/claim');
var chatRouter = require('./api/chat');
var insuranceContractController=require('./controllers/insuranceContractController');
var app = express();
var cors = require('cors');

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/claim', claimRouter);
app.use('/api/chat', chatRouter);
var InsuranceContract=require('./models/insuranceContract');
var listInsuranceContract=[];
var newCoveragesList=[];
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

io.on('connection', (client) => {
  
 // console.log(listeInsuranceContracts);
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  client.on('getAllCoverages', (interval) => {
    setInterval(() => {
      InsuranceContract.find(function (err,insuranceContracts) {
        return insuranceContracts        
    }).then(result=>{
      listInsuranceContract=result;
    })
    var newCoveragesList = insuranceContractController.getGarantiesFromInsuranceContracts(null,listInsuranceContract,null);
     // console.log(newCoveragesList);
      client.emit('CoveragesList', newCoveragesList);
    }, interval);
  });


  client.on('getAllInsuranceContracts',  (interval) => {

    setInterval(async () => {
      InsuranceContract.find(function (err,insuranceContracts) {
        return insuranceContracts
          
    }).then(result=>{
      listInsuranceContract=result;
 
    
    })
          let newInsuranceContractList = await insuranceContractController.filterInsuranceList(null,listInsuranceContract,null);
//console.log(newInsuranceContractList);
      client.emit('InsuranceContractList',newInsuranceContractList);
    }, interval);
  });




  client.on('mostPurchasedInsurances',  (interval) => {

    setInterval(async () => {
      InsuranceContract.find(function (err,insuranceContracts) {
        return insuranceContracts
          
    }).then(result=>{
      listInsuranceContract=result;
 
    
    })
          let newInsuranceContractList = await insuranceContractController.mostPurchasedInsurances(null,listInsuranceContract,null);
          console.log(newInsuranceContractList);
      client.emit('mostPurchasedInsurancesList',newInsuranceContractList);
    }, interval);
  });


  
});
const port = 8000;
io.listen(port);
console.log('listening on port ', port);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
