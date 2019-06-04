// Computer picks random word to guess 

function getItem(){
  // words to guess 
  var words = ['spain', 'japan', 'thailand', 'france', 'united kingdom', 'mexio', 'canada'];
  document.getElementById("wordGuess").innerHTML = word[Math.floor(Math.random() * words.length)];

// Displays possible words and blank spaces 

var possibleWord = "S P A I N";
var blankSpaces = "";
var wordLength = possibleWord.length;

for (i = 0; i <wordLength; i++) {
  var j = possibleWord.charAt(i);

  if (x === '' || x === "/'") {
    blankSpaces += x;
  }
  else {
    blankSpaces += "_"
  }
}

document.getElementById("blankSpaces").innerHTML = blankSpaces;




}