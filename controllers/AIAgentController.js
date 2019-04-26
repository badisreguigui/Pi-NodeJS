var claimController = require('../controllers/claimController'); 
var Accident = require('../models/Accident');
var natural = require('natural');
//const words = require('an-array-of-english-words') //npm install an-array-of-english-words --save
var google = require('google')
var userController = require('../controllers/userController'); 
var User = require('../models/users');
var billingController = require('../controllers/billingController'); 
var paymentController = require('../controllers/paymentsMethodsController'); 
var DossierInscription = require('../models/dossierInscription');
var Conducteur = require('../models/conducteur');
var Voiture = require('../models/voiture');
var Stationnement = require('../models/stationnement');
var Garantie = require('../models/garantie');
var dossierController = require('../controllers/dossierInscriptionsController');
var Claim = require('../models/Claim');
var predictionController = require('../controllers/prediction'); 
var insuranceContarctController = require('../controllers/insuranceContractController'); 
var chatController = require('../controllers/ChatController');
const fs = require('fs');

  class Intent {
      constructor(intentTitle, sentenses) {
        this.intentTitle = intentTitle;
        this.sentenses = sentenses || [];
      }
  
      addSentense(sentense) {
        this.sentenses.push(sentense)
        return "success"; 
      }
  
      addTitle(title) {
        this.title.push(title); 
        return "title added"; 
      }
    }
  
  class Noeud {
    constructor(intentTitle, dialogues, options, pause, image, childNoeud, functions, parametresOptions) {
      this.intentTitle = intentTitle;
      this.sentenses = dialogues || [];
      this.options = options || []; 
      this.pause = pause; 
      this.image = image;
      this.childNoeud = childNoeud; 
      this.functions = functions || [];
      this.parametresOptions = parametresOptions || [];
    }
  }  
  
  class Word {
    constructor(value, score) {
      this.value = value; 
      this.score = score; 
    }
  }
    
    finishedWriting = true; 
    var wordScoresList = [];
    initWordsList();
    var scoreAnalysis = 0; 
    var avgAnalysis = 0; 
    var sommeAnalysis = 0; 
    var outputText = ""; 
    var randomAnswer = 0;
    var inputIntentOrAnswer = true;
    var noeudCurrent = new Noeud(); 
    var answerString = ""; 
    var userConnecte = null;
    var accident = new Accident(); 
    var index = 0;
    var voiture = new Voiture(); 
    var stationnement = new Stationnement(); 
    var garantie = new Garantie(); 
    var conducteur = new Conducteur(); 
    var claim = new Claim(); 
    var gender = ""; 
    var vehiculeSize = ""; 
    var vehiculClass = ""; 
    var employmentStatus = ""; 
    var resultString = ""; 

    const intent = new Intent("Greetings", ["hello", "hi", "hiii", "hey", "what's up"]);
    const intent3 = new Intent("Anger", ["stop", "rude"]);
    const intent2 = new Intent("Opening", ["what's your opening time","open", "close", "closed","when","hours","working hours", "at which time do you", "At what hour can I swing by?", "Can you tell me how late the stores are open till?", "How early do you open?", "How long are you open?", "How long are you open?", ""]);  
    const intent4 = new Intent("Mood", ["how are you doing", "do you do", "and you", "are you", "?"]);
    const intent5 = new Intent("Okay", ["ok", "cool", "okay", "okay then", "fine", "nice", "ehum", "alright", "alright then", "great", "good to know"]);
    const intent6 = new Intent("Thanks", ["thanks", "thank you", "I appreciate it", "appreciate", "love", "love it", "love it so much", "Affirmative. That's what I'm looking for", "All right", "great", "got it", "I like that", "sweet", "this is what I was looking for"]);  
    const intent7 = new Intent("Bye", ["bye", "see you", "see you soon", "see you then", "à la prochaine", "leaving"]);  
    const intent8 = new Intent("Confirmation", ["really", "are you serious", "you sure"]);  
    const intent9 = new Intent("Name", ["your name", "your purpose", "tell me about you", "to know more about you", "what's your mission"]);  
    const intent10 = new Intent("No", ["no", "I don't to", "nevermind"]);  
    const intent11 = new Intent("explanation", ["like what", "for example", "can you explain what you can do?", "who are you and what can you do"]);  
    const intent12 = new Intent("Operation numerique", ["calculate", "plus", "minus", "what's the result of this operation", "+", "-", "*"]);  
    const intent13 = new Intent("Google search", ["search", "search for", "search on the internet for", "google", "google for", "google this",  "wikepedia", "definition of", "look on the internet for", "look up for", "find", "lookup for"]);  
    const intent14 = new Intent("Joke", ["tell me a joke", "funny", "make me laugh", "haha", "show me your sense of humour"]);  
    const intent15 = new Intent("smallTalk", ["how are you", "are you okay", "and you?"]); 
    const intent16 = new Intent("login", ["login", "authenticate", "access my insurance", "access my profile", ]); 
    const intent17 = new Intent("statusClaim", ["check the status of my claim", "check status", "chack status of my insurance claim", "Can you tell me the progress on my case?", "Do my claim proceed further?","Give me info about my current claim.","Has a decision been reached?","Help me to know if there is an update for my claim"
    ,"How to check my car accident claim status online?", "I need the money immediately, can they approve it quickly?", "Is it possible to know the progress of my insurance claim?", "I new information about my claim", "I to know if my claim has been rejected.","The status still in pending for like 3 weeks",
    "What is the date of approval?", "What is the progress on my claim?", "When do I get my money?", "When my claim is gonna be processed?", "When was the claim approved?", "Where is my money?",
    "Which information do I need to provide to check my claim's status?","Which information do I need to provide to check my claim's progress?","Would it be possible to know claim status over a call?"]);  
    const intent18 = new Intent("fileClaim", ["add a claim", "file a claim", "make a claim", "I to file a claim for my car which got damaged in an accident", "my car got damaged in an accident", 
    "Wanted to know about claim filing", "to know about claim filing", "What is the process to file a claim?", "What should be done to file a claim?"]);  
    const intent19 = new Intent("register", ["I am new", "Can you show me where to register for the program?", "Could you explain how to create a fresh account", "How can I register over here?", "How do I become a customer?", "I'd like to register", "Make account", "Please tell me how to register as one of your members.", "What do I need to do to start an account with you", "What is required to get signed up here?", "What is the log in process for new users?", "What is the process to making an account?", "Where do I register for this?"])
    const intent20 = new Intent("assistanceChoice", ["what can you do for me", "what are your options", "I'm hesitant", "I don't know what to ask", "I don't know how"])
    const intent21 = new Intent("payementStatus", ["I to see my payement status", "I to see my paiement status", "I to check my payements", "I to see when my payements are due", "I to ask about my payement", "I to ask about my paiement", "when do you need me to pay for your services?", "when do I pay"])
    const intent22 = new Intent("pay", ["I'm going to pay", "I want to pay for the insurance", "I want to pay for the service", "Can you help me transfer the money to your service", "how can I transfer funds electronically", "Could you please assist me with transferring funds?", "Transfer money to insurance", "Can I do a bill payment?", 
    "Can I pay my bill?", "Can you assist me with paying my bill?","I'd like to pay", "I think I'm gonna pay the bill", "I need to pay the cost of my service plan", "Want to pay", "Do you accept paypal?"])
    const intent23 = new Intent("cancel", ["cancel", "exit", "backup", "back up", "go back one step", "I changed my mind", "nevermind"]); 
    const intent24 = new Intent("policyInquiry", ["I want to have a policy estimation", "I want to estimate my insurance policy with you", "What is the cost of my car coverage", "Am I covered for a car accident and how much?", "what is the cost of a car accident coverage"]); 
    const intent25 = new Intent("prediction", ["What can you suggest to me as a type of insurance", "Can you help me pick an insurance type?", "Can you help me go through the process of picking an insurance type", "What's the best insurance deal you got for me", "How can I pick the best insurance type for my situation"]); 
    const intent26 = new Intent("subscribe", ["subscribe to the option", "confirm my subscription", "can I have that?"]); 
    const intent27 = new Intent("scoreAnalysis", ["score analysis", "mood"]); 
    

    var listIntents = [intent, intent2, intent3, intent4, intent5, intent6, intent7, intent8, intent9, intent10, 
      intent11, intent12, intent13, intent14, intent15, intent16, intent17, intent18, intent19, intent20, intent21, intent22, intent24, intent23, intent25, intent26, intent27]; 
  
    var dialogueInit = ["Thank you for contacting our Insurance. How can we help you?","My name is lambda, I am here to help you", 
    "You can ask me anything", "Let's start a call"]; //init 
    var dialogue1 = ["Hi! What can I do for you?", "Hello sir", "Hey man!"]; //greetings
    var dialogue3 = ["we work from 6am to 9pm", "we are closed now", "every day"]; //opening
    var dialogue4 = ["I am fine thank you", "How are YOU doing", "fine fine", "fine and you?"]; //mood
    var dialogue5 = ["okay then", "yeah...", "alright", "okaay"]; //okay
    var dialogue6 = ["no thanks", "my pleasure", ":)", "glad I could help"]; //thanks
    var dialogue7 = ["bye then", "okay bye", "see you...", "asta la vista", "I had a nice time talking with you",
     "okay get out of my face now"]; //bye
    var dialogue8 = ["yes really", "yes", "dead serious", "I'm sure at 100%", "trust me baby"]; //confirmation
    var dialogue9 = ["my name is Lambda and I am an AI agent for your insurance customer srvice", "my name is Lambda and I was created to satisfy the insurance customer's needs",
   "my name is Lambda and I am here to help you"]; //name 
    var dialogue10 = ["okay, chill", "okay nevermind", "wadha7", "mriguel"]; //no
    var dialogue11 = ["like anything you want", "you can ask about any of our insurance services"]; //explanation
    var dialogue12 = ["The result of your operation is: ", "If my calculations are correct the result is: ",
     "My math is poor but even I can do this one :p "]; //operation
    var dialogueNotUnderstanding = ["can you repeat this differently", 
    "I don't understand, I don't know why", "I am still learning this sentense, can you repeat differently?"]; 
    var dialogueJoke = ["Q. How does a computer get drunk?", "Q. Why did the PowerPoint Presentation cross the road?"]; 
    var dialogueRepeat = ["as I was saying... ", "Humm...I don't like to repeat myself but I will make an exception with you", "As we talked earlier... "]
    var dialogueEmojis = [":)", ":p", ":D"]; 
    var dialogue16 = ["Welcome back to our services."]; //login
    var dialogue17 = ["your claim status is: in progress. Please be patient while our experts study your file"]; //claim status
    var dialogue18 = ["Let's add a new claim for you"]; //fileClaim   
    var dialogue19 = ["Okay let's get you registred", "Welcome on board", "We are glad you can join us, let's sign you up"]; //register   
    var dialogue20 = ["Okay let's see your payement status", "Okay, let me check your payement status", "Okay, let me look up for your payement status"]; //payementStatus 
    var dialogue21 = ["Very good, let me open a paypal window for you", "You can pay with paypal. Let me open a new window for you"]; //pay 
    var dialogue24 = ["Our policy costs depend on your information", "I am going to ask you some info to estimate your policy costs"]; //policyInquiry
    var dialogue25 = ["I will try my best to find the most suitable insurance type for you", "Okay, sure, we'll just need to get some info from you", "It depends on your needs. We'll need to get some info from you"]; //prediction
    var dialogue26 = ["Great. Good choice", "Very well. I'll be subscribing you", "Your subscription to this insurance type is in progress..."]; //
  
    var option1 = ["ask me about your insurance plans", "file an insurance claim", "see your insurance history", "search on the internet through me", "discover many other things that I can do.."];  
    var optionsFileClaim = ["your accident address", "witnesses' contact info", "a description of what happened"]; 
    var optionPayment = ["pay for 6 months", "pay for the year"]
    var paramsAccident = ["When did the accident happen (exact date)?", "Where did it happen (street address)?", "What was your direction?", "What was the other driver's direction?", "Please give me a description of what happened", "How were the driving condtions?", "How was the weather and visibility?", "Were there any witnesses?", "What's his/her name and contact info", "Were there any police officers?", "What's their names and badge numbers?"]
    var paramsConducteur = ["What's your car's constructor", "Nice. What's your car's model", "What's your car's power", "Wow. What's your car's energy type", "What's your car's construction date", "What's the number of Kilometers?"]
    var paramsConducteur2 = ["What's your age ?", "When did you get your driving licence?"]
    var paramsClaim = ["What's the other insurance's name?", "What's the other driver's vehicule model", "What's the other driver's vehicule licence plate"]; 
    //as I was saying... // I don't like to repeate myself // 
    const noeudInit = new Noeud("Init", dialogueInit);
    const noeud1 = new Noeud("Greetings", dialogue1);
    const noeud2 = new Noeud("Anger", [""]);
    const noeud3 = new Noeud("Opening", dialogue3);
    const noeud4 = new Noeud("smallTalk", dialogue4);
    const noeud5 = new Noeud("Okay", dialogue5);
    const noeud6 = new Noeud("Thanks", dialogue6);
    const noeud7 = new Noeud("Bye", dialogue7);  
    const noeud8 = new Noeud("Confirmation", dialogue8);  
    const noeud9 = new Noeud("Name", dialogue9, option1, 5);  
    const noeud10 = new Noeud("No", dialogue10,null,null,null,noeud3);  
    const noeud11 = new Noeud("explanation", dialogue11);  
    const noeud12 = new Noeud("Operation numerique", dialogue12);  
    const noeud13 = new Noeud("Google search", [""]); 
    const noeudEmojis = new Noeud("Emojis", dialogueEmojis); 
    const noeudJoke2 = new Noeud("#", ["A. It takes screenshots.", "A. To get to the other slide."], null, 3, null,noeudEmojis); 
    const noeudJoke1 = new Noeud("Joke", dialogueJoke,null,3,null, noeudJoke2); 
    const noeud16Child = new Noeud("loginChild", ["I'll need these info from you, to get you authenticated"], null, null, null, null,["checkLogin"], ["your name", "your password"]); 
    const noeud16 = new Noeud("login", dialogue16, null, 1, null, noeud16Child, ["answer"]);  
    const noeud17 = new Noeud("statusClaim", dialogue17);  

    const noeud18Child2 = new Noeud("fileClaimChild", ["Now let's start filing the claim"], null,null,null,null,["fileClaimChild2"], paramsClaim);    
    const noeud18Child = new Noeud("fileClaimChild", ["Let's start with your accident's informations. I will need you to give me these details first: "], null,null,null,null,["fileClaimChild"], paramsAccident);    
    const noeud18 = new Noeud("fileClaim", dialogue18, null, null,null, noeud18Child, ["fileClaim"]);  
    const noeud19 = new Noeud("register", dialogue19);  
    const noeud20 = new Noeud("assistanceChoice", ["Well, you can:"], option1); 
    const noeud21 = new Noeud("payementStatus",dialogue20, null, 3, null, null, ["getClientPayement"]); 
    const noeud22Child = new Noeud("payChild",["choose carefully", "choose your payement duration"], null, null, null, null, ["chooseOptionPayment"]); 
    const noeud22 = new Noeud("pay",dialogue21, optionPayment, 3, null, noeud22Child, ["answer"]); 

    const noeud24Child5 = new Noeud("policyInquiryChild", ["Now about you"],null,null,null,null,["policyFinal"], paramsConducteur2);    
    const noeud24Child4 = new Noeud("policyInquiryChild", ["Which type of insurance coverage would you prefer?"],["vol", "incendie", "dommage vehicule", "securite passagers", "bris glace"],null,null,null,["policyInquiryChild4"]);    
    const noeud24Child3 = new Noeud("policyInquiryChild", ["What's your type of travelling?"],["private", "work"],null,null,null,["policyInquiryChild3"]);    
    const noeud24Child2 = new Noeud("policyInquiryChild", ["Now about your parking. Where do you leave your car?"],["in a parking", "in a public road", "in a basement"],null,null,null,["policyInquiryChild2"]);    
    const noeud24Child = new Noeud("policyInquiryChild", ["Let's start with info about you. I will need you to give me these details first: "], null,null,null,null,["policyInquiryChild"], paramsConducteur);    
    const noeud24 = new Noeud("policyInquiry", dialogue24, null, null, null, noeud24Child, ["answer"]); 
    
    const noeud25Child4 = new Noeud("predictionChild", ["What's your employement status? "], null,null,null,null,["prediction4"], ["employed", "unemployed", "retired"]);      
    const noeud25Child3 = new Noeud("predictionChild", ["What's your vehicule class? "], null,null,null,null,["prediction3"], ["four door car", "two door car"]);      
    const noeud25Child2 = new Noeud("predictionChild", ["What's your vehicule size? "], null,null,null,null,["prediction2"], ["medium size", "small size", "large size"]);      
    const noeud25Child = new Noeud("predictionChild", ["Are you: "], null,null,null,null,["prediction1"], ["male", "female"]);      
    const noeud25 = new Noeud("prediction", dialogue25, null, null, null, noeud25Child, ["answer"]); 

    const noeud26 = new Noeud("subscribe", dialogue26, null, 3, null, null, ["subscribe"]); 
    const noeud27 = new Noeud("subscribe", ["From analysis of this conversation:"], null, null, null, null, ["mood"]); 
    const noeudCancel = new Noeud("cancel", ["Okay, let's cancel this", "Okay I'm stopping this process"], null, null, null, null, ["cancel"]); 

    var listNoeuds = [noeud1, noeud2, noeud3, noeud4, noeud5, noeud6, noeud7, noeud8, noeud9, noeud10, noeud11, noeud12, noeud13, noeudJoke1,
       noeudEmojis, noeud16, noeud17, noeud18, noeud19, noeud20, noeud21, noeud22, noeud24, noeud25, noeud26, noeud27, noeudCancel]; 
    var memory = []; 
    var unknownSentences = [];
  
    var classifier = new natural.LogisticRegressionClassifier();
    
    loadIntentsFile();
    loadNoeudFile();
    //train(); 

    exports.mainAI = function (req, res) {
    var randomIndex = Math.floor(Math.random() * noeudInit.sentenses.length);
    console.log(noeudInit.sentenses[randomIndex]); 
        var string = req.query.value; 
        if(userConnecte != null) {
          chatController.addMsg(userConnecte, string, 'user');
        }
        
        var resultAnalysis = sentimentAnalysis(string); 
        sommeAnalysis+= resultAnalysis.sum;  
        scoreAnalysis += resultAnalysis.score;
        avgAnalysis = scoreAnalysis / sommeAnalysis; 
        //mood();
        //console.log("score: "+ scoreAnalysis + " total words : "+ sommeAnalysis + " avg : " + avgAnalysis); 

        var classification = classifier.classify(string); 
        //console.log("#" + classification + ":");
        const results = classifier.getClassifications(string); 
       // console.log(results);
  
        if ((results[0].value < 0.9) || (!inputIntentOrAnswer)|| (string.includes("cancel"))) {
          if ((results[0].value < 0.9) && (inputIntentOrAnswer)) {
            var randomIndex = Math.floor(Math.random() * dialogueNotUnderstanding.length);
            console.log(dialogueNotUnderstanding[randomIndex]); 
            resultString+=dialogueNotUnderstanding[randomIndex] + "\n"; 
            unknownSentences.push(string); 
          }
          else if(!inputIntentOrAnswer){
            answerString = string; 
            if(answerString != "")
              CallNoeudFunctions(noeudCurrent);
          } 
        }

        else {
             classificationList = []; 
             results.forEach(result => {
                  if(result.value > 0.9){
                    classificationList.push(result.label); 
                  }
             });  
             if(checkInMemory(string)) {
              console.log(dialogueRepeat[randomAnswer]);
              resultString+=dialogueRepeat[randomAnswer] + "\n"; 
            }    
            
             classificationList.forEach(classification => {
                listNoeuds.forEach(noeud => {
                    if (noeud.intentTitle == classification){
                      if ((noeud.sentenses.length == 0)&&(classification != "Operation numerique")&&(classification != "Google search")&&(classification != "login")&&(classification != "statusClaim")&&(classification != "fileClaim")) {
                        console.log("ask me something else");
                        resultString+="ask me something else"+ "\n";
                      } 
                      else {
                        memory.push(string); 
                        randomAnswer = Math.floor(Math.random() * noeud.sentenses.length);
                        console.log(noeud.sentenses[randomAnswer]); 
                        resultString+=noeud.sentenses[randomAnswer] + "\n";
                        noeud.sentenses.splice(randomAnswer,1);
                      }
              
                      if (classification == "Operation numerique") {
                        var splitted = string.split(" "); 
                        var test = false; 
                        for(var i = 0; i < splitted.length; i++) {
                          if((splitted[i] == "+") || (splitted[i] == "-") || (splitted[i] == "*")){
                            var param1 = splitted[i-1]; 
                            var param2 = splitted[i+1]; 
                            console.log(operationNum(parseFloat(param1), parseFloat(param2), splitted[i])); 
                            resultString+=operationNum(parseFloat(param1), parseFloat(param2), splitted[i]) + "\n"
                            test = true;
                          }
                        }
                        if(!test){
                          console.log("failed to calculate. Retry by giving an operation separated with '__' "); 
                          resultString+="Failed to calculate. Retry by giving an operation separated with '__'" + "\n";  
                        }
                      }
  
                      if(classification == "Google search") {
                        var searchQuery = string; 
                        for (var i = 0; i < intent13.sentenses.length; i++) {
                          if(string.includes(intent13.sentenses[i])) {
                            var parts = string.split(intent13.sentenses[i]);
                            searchQuery = parts[1]; 
                            break; 
                          }
                        }
                        googleSearch(searchQuery);
                      }
  
                      pauseAndResponseOptions(noeud);
                      CallNoeudFunctions(noeud);
                      checkParametresOptions(noeud);  
                      
                    }
                }); 
          });
          if(finishedWriting)
            console.log("You:"); 
        }

      if(userConnecte != null) {  
        chatController.addMsg(userConnecte, resultString, 'bot');  
      }
      res.end(resultString + " | " + avgAnalysis); 
      resultString = ""; 
    //});
}
  
function checkorth(word) {
  /*var spellcheck = new natural.Spellcheck(words);
  if(!spellcheck.isCorrect(word)){
    console.log(spellcheck.getCorrections(word, 2));
  }
  else {
    console.log("correct word: "+ word); 
  }*/
}

function addIntent(title) {
  const intentNew = new Intent(title, []); 
  listIntents.push(intentNew); 
  train(); 
}

function train() {
  listIntents.forEach(intentElmt => {
    intentElmt.sentenses.forEach(element => {
      classifier.addDocument(element, intentElmt.intentTitle); 
    });
  }); 
  classifier.train();
  
  /*classifier.save('classifier.json', function(err, classifier) {
    console.log("saved");
  });
  natural.LogisticRegressionClassifier.load('classifier.json', null, function(err, result) {
    console.log("loaded")
    classifier = result;
    classifier.train();
  });*/
}

function operationNum(param1, param2, fonction) {
  if(fonction == "+"){
    return param1 + param2; 
  }
  else if (fonction == "-") {
    return param1 - param2; 
  }
  else if (fonction == "*") {
    return param1 * param2; 
  }
}

function checkInMemory(intentSentence) {
  for(var i=0; i<memory.length; i++) {
    if(intentSentence == memory[i]) {
      return true; 
    } 
  }
  return false; 
}

function pauseAndResponseOptions(noeud) {
  if (noeud.pause > 0) {
    finishedWriting = false; 
    console.log("... ");
    resultString+="..." + "\n"; 
    /*var randomTime = (Math.floor(Math.random() * noeud.pause) + 1) * 1000;
    setTimeout(function(){ responseOptions(noeud); finishedWriting = true; }, randomTime);*/
    responseOptions(noeud); 
  }
  else {
    responseOptions(noeud); 
  } 
}

function responseOptions(noeud) {
  if (noeud.options.length > 0){
    console.log("you can either ");
    resultString+="you can either "+"\n";
    for (var i = 0; i < noeud.options.length - 1; i++){
      console.log("* " + noeud.options[i] + " or ");
      resultString+="* " + noeud.options[i] + " or " + "\n"; 
    }
    console.log("* " + noeud.options[noeud.options.length - 1]);
    resultString+="* " + noeud.options[noeud.options.length - 1]+"\n"
  } 
  if (noeud.childNoeud != null){
     nextNoeud(noeud);  
  }
}

function checkParametresOptions(noeud) {
  if (noeud.parametresOptions.length > 0){
    for (var i = 0; i < noeud.parametresOptions.length - 1; i++){
      console.log("* " + noeud.parametresOptions[i] );
      resultString+="* " + noeud.parametresOptions[i] + "\n";
    }
    console.log("* " + noeud.parametresOptions[noeud.parametresOptions.length - 1]);
    resultString+= "* " + noeud.parametresOptions[noeud.parametresOptions.length - 1] + "\n"; 
  }
}

function initWordsList() {
  var fs = require('fs'),
  readline = require('readline'),
  instream = fs.createReadStream('words.txt'),
  outstream = new (require('stream'))(),
  rl = readline.createInterface(instream, outstream);

  rl.on('line', function (line) {
      var parts = line.split("\t"); 
      const word = new Word(parts[0], parseInt(parts[1])); 
      wordScoresList.push(word); 
  });

  rl.on('close', function (line) {
  });
}

function sentimentAnalysis(string) {
  var tokens = string.split(" "); 
  var score = 0; 
  tokens.forEach(token => {
      wordScoresList.forEach(word => {
        if(token == word.value) {
          score+= word.score; 
        }
      });
  });
  var avg = score / tokens.length; 
  var result = {
    'score': score, 
    'avg': avg, 
    'sum': tokens.length
  }; 
  return result; 
}

function googleSearch(stringSearch) {
    google.resultsPerPage = 1

    google(stringSearch +" wikepedia", function (err, res){
      if (err) console.error(err)

      for (var i = 0; i < 1; ++i) {
        var link = res.links[i];
        console.log(link.title + ' * ' + link.href)
        resultString+=link.title + ' * ' + link.href; 
        console.log(link.description + "\n"); 
        resultString+=link.description + "\n"; 
      }
    });
  
}

function CallNoeudFunctions(noeud) {
  if (noeud.functions.length > 0) {
    eval(noeud.functions[0])();
  }
}


function answer() {
  inputIntentOrAnswer = false; 
  
}

async function checkLogin() {
  var parts = parseAnswer(answerString); 
  if ((parts == null) || (parts.length < noeudCurrent.parametresOptions.length)) {
    console.log("Please don't forget " + noeudCurrent.parametresOptions[noeudCurrent.parametresOptions.length - 1]); 
    resultString+="Please don't forget your " + noeudCurrent.parametresOptions[noeudCurrent.parametresOptions.length - 1] + "\n"; 
  }
  else {
    if (parts != null) {
      console.log("passwd: " + parts[0] + " name: " + parts[1]); 
      resultString+="passwd: " + parts[0] + " name: " + parts[1]; 
      var user = new User({
        password: parts[0].trim(), 
        name: parts[1].trim()
      }); 
      userConnecte = await userController.userLogin(user); 
      if(userConnecte != null) {
        resultString += 'Welcome to your account '+ userConnecte.name, '. How can I assist you?' + "\n";
        //res.write('Welcome to your account '+ userConnecte.name, '. How can I assist you?' + "\n"); 
        inputIntentOrAnswer = true; 
        answerString = ""; 
      }
      else {
        console.log("Retry again"); 
        resultString+="Retry again"; 
      }
    }
  }
}

function getClientPayement() {
  billingController.getClientPaymentEtat(userConnecte.id);
}

function chooseOptionPayment() {
  if ((answerString.includes("option 1")) || (answerString.includes("6"))) {
    pay(6); 
    inputIntentOrAnswer = true; 
    answerString = ""; 
  }
  else if ((answerString.includes("option 2")) || (answerString.includes("year")) || (answerString.includes("12"))) {
    pay(12); 
    inputIntentOrAnswer = true; 
    answerString = ""; 
  }
  else {
    console.log("choose between the two options !"); 
    resultString+="choose between the two options !\n"; 
  }
}

function pay(months) {
  paymentController.paywithPaypal(userConnecte.id, months, res); 
  paymentController.success(userConnecte.id, res); 
}

function fileClaim() {
  inputIntentOrAnswer = false;
}

function parseAnswer(string) {
  if (string.includes(',')) {
    return string.split(',');
  }
  else if (string.includes('and')) {
    return string.split('and'); 
  }
  return null; 
}

function fileClaimChild() {
  answeringDialogueClaim(noeudCurrent, ['','dateTime', 'address', 'yourDirection', 'otherDirection', 'description', 'drivingConditions', 'weather', 'witnessName', 'witnessContact', 'namePoliceOfficer', 'badgePoliceOfficer']);
 // answeringDialogueClaim(noeudCurrent);
}

function answeringDialogueClaim(noeud, listParametres) {
  var questionBot = noeud.parametresOptions[index]; 
  console.log(questionBot);
  resultString+=questionBot + "\n"; 
  accident[listParametres[index]] = answerString; 
  
  if (index == noeud.parametresOptions.length) {
    claimController.ajouterAccident(userConnecte.id, accident, res); 
    console.log(noeud18Child2.sentenses[0]);
    resultString+=noeud18Child2.sentenses[0] + "\n"; 
    pauseAndResponseOptions(noeud18Child2); 
    noeudCurrent = noeud18Child2;   
    CallNoeudFunctions(noeud18Child2);
    answerString = ""; 
    index = 0;
  }
  index++;
}

function policyInquiryChild() {
  answeringDialoguePolicy1(noeudCurrent, ['', 'marque', 'model', 'cv', 'energie', 'dateAchat', 'kilometrage'])
}

function nextNoeud(noeud) {
    console.log(noeud.childNoeud.sentenses[0]); 
    resultString+=noeud.childNoeud.sentenses[0] + "\n"; 
     pauseAndResponseOptions(noeud.childNoeud); 
     if ((noeud.intentTitle == "login") || ((noeud.intentTitle == "prediction"))  || ((noeud.intentTitle == "predictionChild")) ) {
      checkParametresOptions(noeud.childNoeud);
     }
     noeudCurrent = noeud.childNoeud;   
     CallNoeudFunctions(noeud.childNoeud);
}

function answeringDialoguePolicy1(noeud, listParametres) {
  var questionBot = noeud.parametresOptions[index]; 
  console.log(questionBot);
  resultString+=questionBot + "\n"; 
  voiture[listParametres[index]] = answerString; 
  
  if (index == noeud.parametresOptions.length) {
      noeud.childNoeud = noeud24Child2; 
      console.log(noeud.childNoeud.sentenses[0]); 
      resultString+=noeud.childNoeud.sentenses[0] + "\n"; 
      pauseAndResponseOptions(noeud.childNoeud); 
      noeudCurrent = noeud.childNoeud;   
      CallNoeudFunctions(noeud.childNoeud);
      index = 0;
  }
  index++;
}

function policyInquiryChild2() {
  if ((answerString.includes("option 1")) || ((answerString.includes("parking")))) {
    stationnement.tStationnement = 'PARKING';
      console.log(noeud24Child3.sentenses[0]); 
      resultString+=noeud24Child3.sentenses[0] + "\n"; 
      pauseAndResponseOptions(noeud24Child3); 
      noeudCurrent = noeud24Child3;   
      CallNoeudFunctions(noeud24Child3);
      answerString = ""; 
  }
  else if ((answerString.includes("option 2")) || ((answerString.includes("public road")))) {
    stationnement.tStationnement = 'VOIE_PUBLIQUE'; 
    console.log(noeud24Child3.sentenses[0]); 
    resultString+=noeud24Child3.sentenses[0] + "\n"; 
      pauseAndResponseOptions(noeud24Child3); 
      noeudCurrent = noeud24Child3;   
      CallNoeudFunctions(noeud24Child3);
      answerString = "";
  }
  else if ((answerString.includes("option 3")) || ((answerString.includes("basement")))) {
    stationnement.tStationnement = 'GARAGE'; 
    console.log(noeud24Child3.sentenses[0]); 
    resultString+=noeud24Child3.sentenses[0] + "\n";
      pauseAndResponseOptions(noeud24Child3); 
      noeudCurrent = noeud24Child3;   
      CallNoeudFunctions(noeud24Child3);
      answerString = "";
  } 
}

function policyInquiryChild3() {
  if ((answerString.includes("1")) || ((answerString.includes("private")))) {
    stationnement.tDeplacement = 'PRIVE';
    answerString = "";
    console.log(noeud24Child4.sentenses[0]); 
    resultString+=noeud24Child4.sentenses[0] + "\n"; 
      pauseAndResponseOptions(noeud24Child4); 
      noeudCurrent = noeud24Child4;   
      CallNoeudFunctions(noeud24Child4);
      answerString = "";
  }
  else if ((answerString.includes("2")) || ((answerString.includes("work")))) {
    stationnement.tDeplacement = 'TRAVAIL'; 
    answerString = "";
    console.log(noeud24Child4.sentenses[0]); 
    resultString+=noeud24Child4.sentenses[0] + "\n"; 
      pauseAndResponseOptions(noeud24Child4); 
      noeudCurrent = noeud24Child4;   
      CallNoeudFunctions(noeud24Child4);
      answerString = "";
  }
}

function policyInquiryChild4() {
  if ((answerString.includes("1")) || ((answerString.includes("vol")))) {
    garantie.vol = true; 
    answerString = "";
    console.log(noeud24Child5.sentenses[0]); 
    resultString+=noeud24Child5.sentenses[0] + "\n"; 
    pauseAndResponseOptions(noeud24Child5); 
    noeudCurrent = noeud24Child5;   
    CallNoeudFunctions(noeud24Child5);
    answerString = "";
  }
  else if ((answerString.includes("2")) || ((answerString.includes("incendie")))) {
    garantie.incendie = true; 
    console.log(noeud24Child5.sentenses[0]);
    resultString+=noeud24Child5.sentenses[0] + "\n";  
    pauseAndResponseOptions(noeud24Child5); 
    noeudCurrent = noeud24Child5;   
    CallNoeudFunctions(noeud24Child5);
    answerString = "";
  }
  else if ((answerString.includes("3")) || ((answerString.includes("dommage vehicule")))) {
    garantie.dommageVehicule = true; 
    console.log(noeud24Child5.sentenses[0]);
    resultString+=noeud24Child5.sentenses[0] + "\n";
    pauseAndResponseOptions(noeud24Child5); 
    noeudCurrent = noeud24Child5;   
    CallNoeudFunctions(noeud24Child5);
    answerString = "";
  }
  else if ((answerString.includes("4")) || ((answerString.includes("securite passagers")))) {
    garantie.securitePassagers = true; 
    console.log(noeud24Child5.sentenses[0]);
    resultString+=noeud24Child5.sentenses[0] + "\n"; 
    pauseAndResponseOptions(noeud24Child5); 
    noeudCurrent = noeud24Child5;   
    CallNoeudFunctions(noeud24Child5);
    answerString = "";
  }
  else if ((answerString.includes("5")) || ((answerString.includes("bris glace")))) {
    garantie.brisDeGlace = true; 
    console.log(noeud24Child5.sentenses[0]); 
    resultString+=noeud24Child5.sentenses[0] + "\n"; 
    pauseAndResponseOptions(noeud24Child5); 
    noeudCurrent = noeud24Child5;   
    CallNoeudFunctions(noeud24Child5);
    answerString = "";
  }
}

function policyFinal() {
  answeringDialoguePolicy2(noeudCurrent, ['age', 'age'])
}
function answeringDialoguePolicy2(noeud, listParametres) {
  var questionBot = noeud.parametresOptions[0]; 
  console.log(questionBot);
  resultString+=questionBot + "\n"; 
  conducteur[listParametres[index]] = answerString; 
  conducteur.age = 20 ; 
  if (index == noeud.parametresOptions.length) {
      resultString+= dossierController.ajouterDossierInscription(conducteur, voiture, stationnement, garantie) + "\n";
      inputIntentOrAnswer = true; 
  }
  index++;
}

function fileClaimChild2() { 
  answeringDialogueClaim2(noeudCurrent, ['','otherInsuranceName', 'otherVehiculeModel', 'otherVehiculeLicencePlate']);
 // answeringDialogueClaim(noeudCurrent);
}

function answeringDialogueClaim2(noeud, listParametres) {
  var questionBot = noeud.parametresOptions[index]; 
  console.log(questionBot);
  resultString+=questionBot + "\n";
  claim[listParametres[index]] = answerString; 
  
  if (index == noeud.parametresOptions.length) {
    claimController.ajouterClaim(userConnecte, accident, res); 
    inputIntentOrAnswer = true; 
  }
  index++;
}

function prediction1() { 
  if ((answerString.includes("option 1")) || ((answerString.includes("male")))) {
    gender = 'm';
    console.log(noeud25Child2.sentenses[0]); 
    resultString+=noeud25Child2.sentenses[0]  + "\n"; 
    pauseAndResponseOptions(noeud25Child2); 
    noeudCurrent = noeud25Child2;   
    CallNoeudFunctions(noeud25Child2);
    checkParametresOptions(noeudCurrent);
    answerString = "";
  }
  else if ((answerString.includes("option 2")) || ((answerString.includes("female")))) {
    gender = 'f'; 
    console.log(noeud25Child2.sentenses[0]); 
    resultString+=noeud25Child2.sentenses[0] + "\n"; 
    pauseAndResponseOptions(noeud25Child2); 
    noeudCurrent = noeud25Child2;   
    CallNoeudFunctions(noeud25Child2);
    checkParametresOptions(noeudCurrent);
    answerString = "";
  }
}

function prediction2() { 
  if (((answerString.includes("medium")))) {
    vehiculeSize = 'Midsize';
    console.log(noeud25Child3.sentenses[0]); 
    resultString+=noeud25Child3.sentenses[0] + "\n"; 
    pauseAndResponseOptions(noeud25Child3); 
    noeudCurrent = noeud25Child3;   
    CallNoeudFunctions(noeud25Child3);
    checkParametresOptions(noeudCurrent);
    answerString = "";
  }
  else if (((answerString.includes("small")))) {
    vehiculeSize = 'Smallsize';
    console.log(noeud25Child3.sentenses[0]);
    resultString+=noeud25Child3.sentenses[0] + "\n";  
    pauseAndResponseOptions(noeud25Child3); 
    noeudCurrent = noeud25Child3;   
    CallNoeudFunctions(noeud25Child3);
    checkParametresOptions(noeudCurrent);
    answerString = "";
  }
  else if (((answerString.includes("large")))) {
    vehiculeSize = 'Large';
    console.log(noeud25Child3.sentenses[0]); 
    resultString+=noeud25Child3.sentenses[0] + "\n";  
    pauseAndResponseOptions(noeud25Child3); 
    noeudCurrent = noeud25Child3;   
    CallNoeudFunctions(noeud25Child3);
    checkParametresOptions(noeudCurrent);
    answerString = "";
  }
}

function prediction3() {
  if (((answerString.includes("four")))) {
    vehiculClass = 'Four-Door Car';
    console.log(noeud25Child4.sentenses[0]); 
    resultString+=noeud25Child4.sentenses[0] + "\n";  
    pauseAndResponseOptions(noeud25Child4); 
    noeudCurrent = noeud25Child4;   
    CallNoeudFunctions(noeud25Child4);
    checkParametresOptions(noeudCurrent);
    answerString = "";
  }
  else if (((answerString.includes("two")))) {
    vehiculeSize = 'Two-Door Car';
    console.log(noeud25Child4.sentenses[0]);
    resultString+=noeud25Child4.sentenses[0] + "\n";   
    pauseAndResponseOptions(noeud25Child4); 
    noeudCurrent = noeud25Child4;   
    CallNoeudFunctions(noeud25Child4);
    checkParametresOptions(noeudCurrent);
    answerString = "";
  }
}

function prediction4() {
  if (((answerString.includes("employed")))) {
    employmentStatus = 'Employed';
    /*const prediction = predictionController.predict(gender, vehiculeSize, vehiculClass, employmentStatus);
    resultString+=prediction + "\n"; */
    inputIntentOrAnswer = true;
  }
  else if (((answerString.includes("unemployed")))) {
    employmentStatus = 'Unemployed';
    /*const prediction = predictionController.predict(gender, vehiculeSize, vehiculClass, employmentStatus);
    resultString+=prediction + "\n"; */
    inputIntentOrAnswer = true;
  }
  else if (((answerString.includes("retired")))) {
    employmentStatus = 'Retired';
    /*const prediction = predictionController.predict(gender, vehiculeSize, vehiculClass, employmentStatus);
    resultString+=prediction + "\n"; */
    inputIntentOrAnswer = true;
  }
}

async function subscribe() {
  /*const msg = await insuranceContarctController.addInsuranceContract(userConnecte); 
  resultString+= msg + "\n"; */
}

function mood() {
  console.log("score: "+ scoreAnalysis + " total words : "+ sommeAnalysis + " avg : " + avgAnalysis);
  resultString+="score: "+ scoreAnalysis + " total words : "+ sommeAnalysis + " avg : " + avgAnalysis + "*";    
}

function cancel() {
  inputIntentOrAnswer = true; 
}

function initializeTraining() {

}

exports.newIntent = function (req, res) {
  //const intentNew = new Intent(req.body.title, req.body.sentenses); 
  
  const intentNew = {
      "intentTitle": req.body.intentTitle,
      "sentenses": req.body.sentenses
  }
  listIntents.push(intentNew);
  saveIntentsFile();
  train();
  res.send(intentNew);
}

exports.newNoeud = function (req, res) {
  const newNoeud = new Noeud(req.body.intentTitle, req.body.sentenses, req.body.options, req.body.pause, null, req.body.childNoeud, null, req.body.functions); 
  listNoeuds.push(newNoeud);
  let data = JSON.stringify(listNoeuds);  
  fs.writeFileSync('listNoeuds.json', data);
  res.send(newNoeud);

}

exports.listIntents = function (req, res) {
  loadIntentsFile();
  res.send(listIntents);
}

exports.listNoeuds = function (req, res) {
  loadNoeudFile();
  res.send(listNoeuds);
}

function saveIntentsFile() {
  let data = JSON.stringify(listIntents);  
  fs.writeFileSync('listIntents.json', data);  
}

function loadIntentsFile() {
    fs.readFile('listIntents.json', (err, data) => {  
      if (err) throw err;
      let intents = JSON.parse(data);
      listIntents = intents;
      train();
    });
}

function loadNoeudFile() {
  fs.readFile('listNoeuds.json', (err, data) => {  
    if (err) throw err;
    let noeuds = JSON.parse(data);
    listNoeuds = noeuds;
  });
}

    