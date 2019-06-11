 var word = "fat";
var results = []


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

 function processor(answer, i, func2){
   if(word[i] == answer && i == 2){
     console.log('Done');
   }
   else if(word[i] == answer){
     console.log('Continue')
     highlight(word[i+1]);
     func2(i+1, processor)
   }
   else{
     console.log('Not yet')
     func2(i, processor)
   }
 }

 function check(i, func){
   var recognizer = new webkitSpeechRecognition();

// Start producing results before the person has finished speaking
  recognizer.interimResults = true;
  recognizer.continuous = true;

// Set the language of the recognizer
  recognizer.lang = 'en-US';
  recognizer.onresult = function(event) { //this is the function that is lagging
      console.log('It works');
      var res = event.results[0][0].transcript;
      results.push(res)
      console.log(results);
      if(results.length == 1){
        recognizer.interimResults = false;
        recognizer.stop();
        console.log('recognizing');
        var resolution = results[0];
        results = [];
        func(resolution, i, check);
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
   document.getElementById("new").innerHTML = word;
   highlight(word[0]);

   setTimeout(function() { check(0, processor);}, 7000);

 }
