 var sentence = "cat in hat";
 var words = sentence.split(" ");
 var phrase = " ";
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
   console.log(ind)
   responsiveVoice.speak("Spell");
   var j = 0;
   function iter(w, ind){

     if(j < w.length){
       responsiveVoice.speak(w.charAt(j));
       highlight(letter);
       // if(j > 0){
       //   unhighlight((j-1) + ind);
       // }
       console.log(letter);
       j++;
       letter += 1;

       setTimeout(function () {iter(w, ind);}, 1000);
     }
     else{
       highlightword(letter-w.length, letter);
       console.log(letter-w.length, letter);




       // unhighlight(w.charAt(j-1));

       check(ind, processor, results);
     }

   }
   setTimeout(function () {iter(word, ind);}, 1000);
 }

 function processor(answer, i, func2, results){ //func2 is iterate
   if(words[i] == answer && i == 2){
     responsiveVoice.speak("hooray");
   }
   else if(words[i] == answer){
     letter += 1;
     phrase += words[i];
     phrase += " ";

     func2(words[i+1], i+1, results);
   }
   else{
     responsiveVoice.speak("try again");
     letter -= words[i].length
     setTimeout(function(){func2(words[i], i, results)}, 1000);
   }
 }


 function check(i, func, results){
   var recognizer = new webkitSpeechRecognition();

// Start producing results before the person has finished speaking
  recognizer.interimResults = true;
  recognizer.continuous = true;

// Set the language of the recognizer
  recognizer.lang = 'en-US';
  recognizer.onresult = function(event) { //this is the function that is lagging
      var res = event.results[0][0].transcript;
      results.push(res)

      if(results.length == 2){
        console.log(results);
        recognizer.interimResults = false;
        recognizer.stop();
        console.log('recognizing');
        var resolution = results[1];

        func(resolution, i, iterate, []); //processor
      }


  };
  recognizer.start();
  console.log('Ready to hear the answer');


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
