const SimpleTTS = require("simpletts");
const tts = new SimpleTTS();


exports.say = function (req, res) {
    var text = 'you can ask me about ask me about your insurance plans , file an insurance claim, see your insurance history. '
    
        tts.read({ "text": text, "volume": 75, "speed": 50 }).then(() => {
            console.log(text);
        }).catch((err) => {
            console.log(err);
        });
    
        tts.getVoices().then((voices) => {
    
            console.log(voices)
            console.log(voices[0].name);
            console.log(voices[0].gender);
    
        }).catch((err) => {
            console.log(err);
        });
        res.render('../views/success.twig');
}