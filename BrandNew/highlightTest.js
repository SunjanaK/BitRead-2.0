 var word = "fat";


 function check(item, i){
   while(i < 3){
     var recognizer = new webkitSpeechRecognition();
     // var SpeechRecognition = (
     //   window.SpeechRecognition ||
     //   window.webkitSpeechRecognition
     // );
     // var recognizer = new SpeechRecognition();

  // Start producing results before the person has finished speaking
    recognizer.interimResults = true;

  // Set the language of the recognizer
    recognizer.lang = 'en-US';
    recognizer.onresult = function(event) { //this is the function that is lagging 
        console.log('You said: ', event.results[0][0].transcript);
        i += 1;
        delay(i);

    };
    recognizer.start();
    console.log('Ready to hear the answer');

   }
}





 var InstantSearch = {

     "highlight": function (container, highlightText)
     {
         var internalHighlighter = function (options)
         {

             var id = {
                 container: "container",
                 tokens: "tokens",
                 all: "all",
                 token: "token",
                 className: "className",
                 sensitiveSearch: "sensitiveSearch"
             },
             tokens = options[id.tokens],
             allClassName = options[id.all][id.className],
             allSensitiveSearch = options[id.all][id.sensitiveSearch];


             function checkAndReplace(node, tokenArr, classNameAll, sensitiveSearchAll)
             {
                 var nodeVal = node.nodeValue, parentNode = node.parentNode,
                     i, j, curToken, myToken, myClassName, mySensitiveSearch,
                     finalClassName, finalSensitiveSearch,
                     foundIndex, begin, matched, end,
                     textNode, span, isFirst;

                 for (i = 0, j = tokenArr.length; i < j; i++)
                 {
                     curToken = tokenArr[i];
                     myToken = curToken[id.token];
                     myClassName = curToken[id.className];
                     mySensitiveSearch = curToken[id.sensitiveSearch];

                     finalClassName = (classNameAll ? myClassName + " " + classNameAll : myClassName);

                     finalSensitiveSearch = (typeof sensitiveSearchAll !== "undefined" ? sensitiveSearchAll : mySensitiveSearch);

                     isFirst = true;
                     while (true)
                     {
                         if (finalSensitiveSearch)
                             foundIndex = nodeVal.indexOf(myToken);
                         else
                             foundIndex = nodeVal.toLowerCase().indexOf(myToken.toLowerCase());

                         if (foundIndex < 0)
                         {
                             if (isFirst)
                                 break;

                             if (nodeVal)
                             {
                                 textNode = document.createTextNode(nodeVal);
                                 parentNode.insertBefore(textNode, node);
                             } // End if (nodeVal)

                             parentNode.removeChild(node);
                             break;
                         } // End if (foundIndex < 0)

                         isFirst = false;


                         begin = nodeVal.substring(0, foundIndex);
                         matched = nodeVal.substr(foundIndex, myToken.length);

                         if (begin)
                         {
                             textNode = document.createTextNode(begin);
                             parentNode.insertBefore(textNode, node);
                         } // End if (begin)

                         span = document.createElement("span");
                         span.className += finalClassName;
                         span.appendChild(document.createTextNode(matched));
                         parentNode.insertBefore(span, node);

                         nodeVal = nodeVal.substring(foundIndex + myToken.length);
                     } // Whend

                 } // Next i
             }; // End Function checkAndReplace

             function iterator(p)
             {
                 if (p === null) return;

                 var children = Array.prototype.slice.call(p.childNodes), i, cur;

                 if (children.length)
                 {
                     for (i = 0; i < children.length; i++)
                     {
                         cur = children[i];
                         if (cur.nodeType === 3)
                         {
                             checkAndReplace(cur, tokens, allClassName, allSensitiveSearch);
                         }
                         else if (cur.nodeType === 1)
                         {
                             iterator(cur);
                         }
                     }
                 }
             }; // End Function iterator

             iterator(options[id.container]);
         } // End Function highlighter
         ;


         internalHighlighter(
             {
                 container: container
                 , all:
                     {
                         className: "highlighter"
                     }
                 , tokens: [
                     {
                         token: highlightText
                         , className: "highlight"
                         , sensitiveSearch: false
                     }
                 ]
             }
         ); // End Call internalHighlighter

     } // End Function highlight

 };








 function highlight(highlightText)
 {
     var container = document.getElementById("new");
     InstantSearch.highlight(container, highlightText);
 }




 // function highlight(text) {
 //   var inputText = document.getElementById("new");
 //   var innerHTML = inputText.innerHTML;
 //   var index = innerHTML.indexOf(text);
 //   if (index >= 0) {
 //    innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
 //    inputText.innerHTML = innerHTML;
 //   }
 // }

 function sleep(milliseconds) {
   var start = new Date().getTime();
   for (var i = 0; i < 1e7; i++) {
     if ((new Date().getTime() - start) > milliseconds){
       break;
     }
   }
 }


 function begin(){
   responsiveVoice.speak("Welcome to Bitreed. When you see a letter being highlighted, please say that letter");
   document.getElementById("new").innerHTML = word;

   function delay(i){
     check(word[i], i)

     }


     // for(i = 0; i < word.length; i++){
     //
     //   highlight(word[i]);
     //   check(word[i]) //recording turns on and shuts down in an instant
     //
     //   // var res = check(word[i]);
     //   // if(res == true){
     //   //   console.log("It works!")
     //   // }
     //   // else{
     //   //   console.log("It doesn't work")
     //   // }
     //
     //     // res = check(word[i]);
     //   }

     // highlight(word);
     // var end = check(word[i]);
     // if(end == true){
     //   responsiveVoice.speak("Well done");
     // }
     // else{
     //   responsiveVoice.speak("Better luck next time");
     // }
setTimeout(delay(0), 7000);
   }
