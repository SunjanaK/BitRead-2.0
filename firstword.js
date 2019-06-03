//
// const fs = require('fs');
//
// // Imports the Google Cloud client library
// const textToSpeech = require('@google-cloud/text-to-speech');
//
// // Creates a client
// const client = new textToSpeech.TextToSpeechClient();
//
// // The text to synthesize
// const text = 'Hello, world!';
//
// // Construct the request
// const request = {
//   input: {text: text},
//   // Select the language and SSML Voice Gender (optional)
//   voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
//   // Select the type of audio encoding
//   audioConfig: {audioEncoding: 'MP3'},
// };
//
// // Performs the Text-to-Speech request
// client.synthesizeSpeech(request, (err, response) => {
//   if (err) {
//     console.error('ERROR:', err);
//     return;
//   }
//
//   // Write the binary audio content to a local file
//   fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
//     if (err) {
//       console.error('ERROR:', err);
//       return;
//     }
//     console.log('Audio content written to file: output.mp3');
//   });
// });




var sentences = ["sally", "eats", "cake"]
var test = ["cat", "dog", "monkey", "elephant", "fish"]
var ind = 0;
var j = 0;

function highlight(text) {
  var inputText = document.getElementById("inputText");
  var innerHTML = inputText.innerHTML;
  var index = innerHTML.indexOf(text);
  if (index >= 0) {
   innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
   inputText.innerHTML = innerHTML;
  }
}




function check(word){
  var recognition = new webkitSpeechRecognition(); //get new instance
  recognition.start(); //start it
  // recognition.onend = function() { //a function to restart it when it stops
  // 	recognition.start();
  // }

  recognition.onresult = function(event) {
      var whatWasHeard = event.results[0][0].transcript; //get what was heard
      console.log(whatWasHeard);
      if(whatWasHeard.toLowerCase() === word.toLowerCase()){
        responsiveVoice.speak('Awesome!');
        console.log(whatWasHeard);
      }
      else{
        responsiveVoice.speak('Try again');
      }
  };

}


function begin(){
  responsiveVoice.speak("Spell");

  function dissect(){


    var q = sentences[ind];
    if (j < q.length) {
      responsiveVoice.speak(q.charAt(j));
      document.getElementById("new").innerHTML += q.charAt(j) + " ";
      // highlight(q.charAt(j));
      j++;
      console.log(j)
      setTimeout(dissect, 1000);

    }
    setTimeout(check(sentences[ind]), 2000);
    // break;
}
setTimeout(dissect, 2000);

// dissect();


  // if (j == q.length) {
  //   responsiveVoice.speak("Spell");
  // }
}
