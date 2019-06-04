// Create a giant wordGuess object that contains all the variables and logics 

// places with pictures and music 

var wordGuess = {

  wordsToPick: {
    laos: {
      picture: "laos.jpg",
      // song: "",
      // preview: "",
    },

    japan: {
      picture: "cherry-blossoms.jpg",
      // song: "",
      // preview: "",
    },

    thailand: {
      picture: "thailand.jpg",
      // song: "",
      // preview: "",
    },

    france: {
      picture: "paris.jpg",
      // song: "",
      // preview: "",
    },

    london: {
      picture: "palace.jpg",
      // song: "",
      // preview: "",
    },

  },

  // Variables  that set up our Game 

  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesRemaining: 0,
  totalGuesses: 0,
  lettersGuessed: null,
  wins: 0,


  // Now we are going to set up the game 

  setUp: function () {
    // words to guess 
    // var words = ['laos', 'japan', 'thailand', 'france', 'london'];

    // Computer picks random word to guess 
    var objKeys = Object.keys(this.wordsToPick);
    this.wordsToPick = objKeys[Math.floor(Math.random() * objKeys.length)];

    //Split the word into individual letters
    // this.lettersOfTheWord = this.wordInPlay.split(" ");

    // underscores for letters guessed ("_ _ _ _ _")
    this.rebuildWordView();

    // This function sets the number of guesses the user gets, and renders it to the HTML.
    this.processUpdateTotalGuesses();

  },

  // now create a function that runs whenever the user guesses a letter

  updatePage: function (letter) {
    // if they ran out of guesses, restart the game 
    if (this.guessesRemaining === 0) {
      this.restartGame();
    }
    // if not 
    else {
      // check for incorrect guesses
      this.updateGuesses(letter);

      // check for correct guesses 
      this.updateMatchedLetters(letter);

      // guessed letter are revealed, non-guessed letters have a "_"
      this.rebuildWordView();

      // user wins , restart game 
      if (this.updateWins() === true) {
        this.restartGame();
      }
    }
  },

  // If the user is correct

  updateGuesses: function (letter) {
    // create a loop for the letters of the "solution"
    if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
      // now push the new guessed letter into the matchedLetters arrary
      this.matchedLetters.push(letter);

      // decrease guesses by one
      this.guessesRemaining--;


      // update guesses remaining and letters on the page 
      document.querySelector('#guesses-remaining').innerHTML = this.guessesRemaining;
      document.querySelector("#guessed-letters").innerHTML = this.guessedLetters.join(", ");
    }
  },

  // inital guesses the user gets 
  processUpdateTotalGuesses: function () {
    // user will get more guesses the longer the word is 
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesRemaining = this.totalGuesses;


    // guesses left to the page 
    document.querySelector("#guesses-remaining").innerHTML = this.guessesRemaining;
  },


  // if the user makes a successful guess
  updateMatchedLetters: function () {
    // lope
    for ( i = 0; i < lettersOfTheWord.length; i++) {
      // guessed letters is in the solution, and letters we havne't guessed yet
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        // push newly guessed letter into the matched array
        this.matchedLetters.push(letter);
      }
    }
  },


  rebuildWordView: function () {
    // empty string
    var wordView = "";

    // letters we are trying to guess 
    for ( i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        wordView += this.lettersOfTheWord[i];
      } else {
        wordView += "&nbsp;_&nbsp;";
      }

    }

    document.querySelector("#current-word").innerHTML = wordView;

  },

  // RESETING THE GAME 

  restartGame: function () {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.wordInPlay = null;
    this.matchedLetters = [],
      this.guessedLetters = [],
      this.guessesRemaining = 0,
      this.totalGuesses = 0,
      this.lettersGuessed = null,
      this.setUp();
    this.rebuildWordView();


  },


  updateWins: function () {
    var win;

    if (this.matchedLetters.length === 0) {
      win = false;
    } else {
      win = true;
    }

    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false;
      }
    }
    // If win is true...
    if (win) {

      // Increment wins.
      this.wins = this.wins + 1;

      // Update wins on the page.
      document.querySelector("#wins").innerHTML = this.wins;

      // Update the image of the band on the page.
      document.querySelector("#band-div").innerHTML =
        "<img class='band-image' src='../images/" +
        this.wordsToPick[this.wordInPlay].picture + "' alt='";

      // return true, which will trigger the restart of our game in the updatePage function.
      return true;
    }
    // If win is false, return false to the updatePage function. The game goes on!
    return false;
  }

};


// initialize the game when the page loads 

wordGuess.setUp();


// ONKEY function 

document.onkeyup = function (event) {
  if (event.keyCode >= 49 && event.keyCode <= 90) {
    // make it lowercase 
    wordGuess.lettersGuessed = event.key.toLowerCase();
    // nw fun the function to the game logic 
    wordGuess.updatePage(wordGuess.lettersGuessed);
  }

};