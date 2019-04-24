var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
var db = require('./Database/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./api/users');
<<<<<<< HEAD
var claimRouter = require('./api/claim');
var chatRouter = require('./api/chat');
=======
var voitureRouter = require('./api/voitures');
var messageRouter = require('./api/messages');
var conducteurRouter = require('./api/conducteurs');
var stationnementRouter = require('./api/stationnements');
var garantieRouter = require('./api/garanties');
var predictRouter=require('./api/prediction');
var dossierInscriptionRouter = require('./api/dossierInscriptions');
//var usersRouter = require('./api/users ');
var policyContractRouter=require('./api/insuranceContract');

var billing = require('./api/billing');
var textSpeech = require('./api/textSpeech');
var paymentsMethods = require('./api/paymentsMethods');
var mailRouter = require('./api/mail');


>>>>>>> b95c0991e7ebf027f2be913892236a13de69e3b0

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
<<<<<<< HEAD
app.use('/api/claim', claimRouter);
app.use('/api/chat', chatRouter);
=======
app.use('/api/messages', messageRouter);
app.use('/api/predict', predictRouter);
app.use('/voitures',voitureRouter);
app.use('/conducteurs',conducteurRouter);
app.use('/stationnements',stationnementRouter);
app.use('/garanties',garantieRouter);
app.use('/inscriptions',dossierInscriptionRouter);
app.use('/policyContract',policyContractRouter);


app.use('/billing',billing);
app.use('/textspeech',textSpeech);
app.use('/paymentsMethods',paymentsMethods);
app.use('/mail',mailRouter);

>>>>>>> b95c0991e7ebf027f2be913892236a13de69e3b0

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
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
