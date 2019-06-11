// var word = "fat";
//  var InstantSearch = {
//
//      "highlight": function (container, highlightText)
//      {
//          var internalHighlighter = function (options)
//          {
//
//              var id = {
//                  container: "container",
//                  tokens: "tokens",
//                  all: "all",
//                  token: "token",
//                  className: "className",
//                  sensitiveSearch: "sensitiveSearch"
//              },
//              tokens = options[id.tokens],
//              allClassName = options[id.all][id.className],
//              allSensitiveSearch = options[id.all][id.sensitiveSearch];
//
//
//              function checkAndReplace(node, tokenArr, classNameAll, sensitiveSearchAll)
//              {
//                  var nodeVal = node.nodeValue, parentNode = node.parentNode,
//                      i, j, curToken, myToken, myClassName, mySensitiveSearch,
//                      finalClassName, finalSensitiveSearch,
//                      foundIndex, begin, matched, end,
//                      textNode, span, isFirst;
//
//                  for (i = 0, j = tokenArr.length; i < j; i++)
//                  {
//                      curToken = tokenArr[i];
//                      myToken = curToken[id.token];
//                      myClassName = curToken[id.className];
//                      mySensitiveSearch = curToken[id.sensitiveSearch];
//
//                      finalClassName = (classNameAll ? myClassName + " " + classNameAll : myClassName);
//
//                      finalSensitiveSearch = (typeof sensitiveSearchAll !== "undefined" ? sensitiveSearchAll : mySensitiveSearch);
//
//                      isFirst = true;
//                      while (true)
//                      {
//                          if (finalSensitiveSearch)
//                              foundIndex = nodeVal.indexOf(myToken);
//                          else
//                              foundIndex = nodeVal.toLowerCase().indexOf(myToken.toLowerCase());
//
//                          if (foundIndex < 0)
//                          {
//                              if (isFirst)
//                                  break;
//
//                              if (nodeVal)
//                              {
//                                  textNode = document.createTextNode(nodeVal);
//                                  parentNode.insertBefore(textNode, node);
//                              } // End if (nodeVal)
//
//                              parentNode.removeChild(node);
//                              break;
//                          } // End if (foundIndex < 0)
//
//                          isFirst = false;
//
//
//                          begin = nodeVal.substring(0, foundIndex);
//                          matched = nodeVal.substr(foundIndex, myToken.length);
//
//                          if (begin)
//                          {
//                              textNode = document.createTextNode(begin);
//                              parentNode.insertBefore(textNode, node);
//                          } // End if (begin)
//
//                          span = document.createElement("span");
//                          span.className += finalClassName;
//                          span.appendChild(document.createTextNode(matched));
//                          parentNode.insertBefore(span, node);
//
//                          nodeVal = nodeVal.substring(foundIndex + myToken.length);
//                      } // Whend
//
//                  } // Next i
//              }; // End Function checkAndReplace
//
//              function iterator(p)
//              {
//                  if (p === null) return;
//
//                  var children = Array.prototype.slice.call(p.childNodes), i, cur;
//
//                  if (children.length)
//                  {
//                      for (i = 0; i < children.length; i++)
//                      {
//                          cur = children[i];
//                          if (cur.nodeType === 3)
//                          {
//                              checkAndReplace(cur, tokens, allClassName, allSensitiveSearch);
//                          }
//                          else if (cur.nodeType === 1)
//                          {
//                              iterator(cur);
//                          }
//                      }
//                  }
//              }; // End Function iterator
//
//              iterator(options[id.container]);
//          } // End Function highlighter
//          ;
//
//
//          internalHighlighter(
//              {
//                  container: container
//                  , all:
//                      {
//                          className: "highlighter"
//                      }
//                  , tokens: [
//                      {
//                          token: highlightText
//                          , className: "highlight"
//                          , sensitiveSearch: false
//                      }
//                  ]
//              }
//          ); // End Call internalHighlighter
//
//      } // End Function highlight
//
//  };
//
// function highlight(highlightText)
// {
//     console.log(highlightText);
//     var container = document.getElementById("new");
//     InstantSearch.highlight(container, highlightText);
// }
//

function finish(result, ind, func){
  console.log("Thick spicy daddy", result);
  console.log(ind);
  if(ind < 3){
    func(finish, ind);
  }
}
var results = []
function check(func, i){
  var recognizer = new webkitSpeechRecognition();

// Start producing results before the person has finished speaking
 recognizer.interimResults = true;

// Set the language of the recognizer
 recognizer.lang = 'en-US';
 recognizer.onresult = function(event) { //this is the function that is lagging
     console.log('It works');
     var res = event.results[0][0].transcript;
     results.push(res)
     console.log(results);
     if(results.length == 1){
       recognizer.stop();
       console.log('recognizing');
       var resolution = results[0];
       results = [];
       func(resolution, i+1, check);
     }




     // results.push(res)
     // console.log('You said: ', res);
     // console.log(res.length);

};


 recognizer.start();
 console.log('Ready to hear the answer');


}

function begin(){
  check(finish, 0);
}


//   // responsiveVoice.speak("Welcome");
//   document.getElementById("new").innerHTML = word;
//
//   setTimeout(function() { check();}, 1000);
//
// }
// function check (){
// //   var ctrl = new anycontrol()
// //
// // ctrl.addCommand("previous page", function() {
// //   console.log('Go to previous page')
// // });
// //
// // ctrl.addCommand("next page", function () {
// //   console.log('Go to next page')
// // });
// //
// // ctrl.start();
//   highlight(word[0]);
//   var ctrl = new anycontrol()
//   for(i = 0; i < 2; i++){
//     ctrl.addCommand(word[i], function() { highlight(word[i+1]; console.log("hi there")) });
//   }
//   ctrl.addCommand(word.charAt(word.length - 1), function(){highlight(word); console.log("almost done")});
//
//   ctrl.start();
//
// }
