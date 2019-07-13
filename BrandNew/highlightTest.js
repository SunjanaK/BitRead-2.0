 var sentence = "cat in car";
 var words = sentence.split(" ");
 var phrase = [];
 var letter = 0;

function highlight(ind){
  $(function(){
    var docText = $('#new').text();
    var modifiedText = docText.highLightAt(ind); //pass a index and that text will be highlighted.
    $('#new').html(modifiedText);
  });
}

function highlightword(startind, endind){
  $(function(){
    var docText = $('#new').text();
    var modifiedText = docText.highlightWord(startind, endind);
    $('#new').html(modifiedText);
  });
}

function show_image(src, width, height, alt){
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  img.height = height;
  img.alt = alt;
  document.body.appendChild(img);
}


    //you can replace this 3 lines of code to single line like
    // $('#docContent').html($('#docContent').text().highLightAt(7));


  //define a highLightAt function to replace your char with a highlighted one.
  String.prototype.highLightAt = function(index) {
    return this.substring(0, index) + '<span class="highlight">' + this.charAt(index) + '</span>' + this.substring(index +1);
  }

  String.prototype.highlightWord = function(startind, endind){
    console.log(this.substring(startind, endind));
    return this.substring(0, startind) + '<span class="highlight">' + this.substring(startind, endind) + '</span>' + this.substring(endind);
  }

 function iterate(word, ind, results){
   // console.log(ind)
   responsiveVoice.speak("Spell");
   var j = 0;
   console.log("Word is" + word);
   function iter(w, ind){

     if(j < w.length){
       if(ind == 0){
         responsiveVoice.speak(w.charAt(j));
         highlight(j);
         j++;
         // letter += 1;
       }
       else{
         responsiveVoice.speak(w.charAt(j));
         //calculating highlight point
         highlight(words.slice(0, ind).join().length + 1 + j);
         j += 1;

       }
       setTimeout(function () {iter(w, ind);}, 1000);
     }
     else{

       check(ind, processor, results);
     }

   }
   setTimeout(function () {iter(word, ind);}, 1000);
 }

 function processor(answer, i, func2, results){ //func2 is iterate
   console.log(phrase)
   phrase.push(words[i]);
   if(answer.indexOf(words[i]) != -1 && i == 2){
     phrasecheck();

   }
   else if(answer.indexOf(words[i]) != -1 && phrase.length > 1){
     phrasecheck();
   }
   else if(answer.indexOf(words[i]) != -1){
     letter += 1;


     func2(words[i+1], i+1, results);
   }
   else{
     responsiveVoice.speak("try again");
     phrase.pop();
     letter -= words[i].length
     setTimeout(function(){func2(words[i], i, results)}, 1000);
   }
 }


 function check(i, func, results){
   highlightword(sentence.indexOf(words[i]), sentence.indexOf(words[i]) + words[i].length);
   var recognizer = new webkitSpeechRecognition();

// Start producing results before the person has finished speaking
  recognizer.interimResults = true;
  recognizer.continuous = true;

// Set the language of the recognizer
  recognizer.lang = 'en-US';
  recognizer.onresult = function(event) { //this is the function that is lagging
      var res = event.results[0][0].transcript;
      results.push(res);


      if(results.length == 2){
        console.log(results);
        recognizer.interimResults = false;

        recognizer.stop();
        console.log('recognizing');


        func(results, i, iterate, []); //processor
      }


  };
  recognizer.start();
  console.log('Ready to hear the answer');


 }

 function phrasecheck() {
   responsiveVoice.speak("Now put the words together")
   //highlighting of phrase
   setTimeout(function() { check(0, processPhrase, []);}, 2000);
 }

 function processPhrase(answers, i, func2, results){ //func2 is iterate
   console.log("Index is" + i);
   console.log("Phrase length is" + phrase.length);
   if(answers.indexOf(words[i]) != -1 && i == words.length-1){
     responsiveVoice.speak("hooray");
   }
   else if(answers.indexOf(words[i]) != -1 && i == phrase.length-1){
     console.log(words[i+1])
     func2(words[i+1], i+1, results);
   }
   else if(answers.indexOf(words[i]) != -1 ){
     check(i+1, processPhrase, results)
   }
   else{
     func2(words[i], i, results);
   }
 }


 var hidden = false;
 function action() {
     hidden = !hidden;
     if(hidden) {
         document.getElementById('togglee').style.visibility = 'hidden';
     } else {
         document.getElementById('togglee').style.visibility = 'visible';
     }
 }


 function begin(){
   action();
   responsiveVoice.speak("Welcome to Bitreed. When you see a letter being highlighted, please say that letter");
   document.getElementById("new").innerHTML = sentence;


   setTimeout(function() { iterate(words[0], 0, []);}, 7000);

 }
