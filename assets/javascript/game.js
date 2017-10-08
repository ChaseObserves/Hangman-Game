// GLOBAL VARIABLES
//------------------------------------------------------------------------------------
//Arrays and variables for holding data
var wordOptions = ['ahoy', 'avast', 'blackbeard', 'scurvy', 'matey'];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

//Game counters
var winCount = 0;
var guessesLeft = 10;

//FUNCTIONS
//------------------------------------------------------------------------------------

// Select a word and determine how many letters are in the word to set the number of blanks needed
function startGame () {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersInWord = selectedWord.split("");
	numBlanks = lettersInWord.length;

	//Reset
	guessesLeft = 10;
	wrongLetters = [];
	blanksAndSuccesses = [];

	// Populate blanksAndSuccesses with right number of blanks
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
	}

	//Affect HTML with JS
	document.getElementById("hidden-letters").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("guesses-left").innerHTML = guessesLeft;
	document.getElementById("win-count").innerHTML = winCount;

	console.log(selectedWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

//------------------------------------------------------------------------------------

function checkLetters(letter) {
	// Check if letter exists at all
	var isLetterInWord = false;
	var gallowsArray = ["assets/images/hangman0.png", "assets/images/hangman1.png", "assets/images/hangman2.png", "assets/images/hangman3.png", "assets/images/hangman4.png", "assets/images/hangman5.png", "assets/images/hangman6.png", "assets/images/hangman7.png", "assets/images/hangman8.png", "assets/images/hangman9.png", "assets/images/hangman10.png"]
	var gallowsImage;
	// var gallowsImage = document.getElementById("gallows").src = gallowsArray

	for (var i = 0; i < numBlanks; i++) {
		if (selectedWord[i] == letter) {
			isLetterInWord = true;
		}
	}

	//Check where in word letter exists, then populate blanksAndSuccesses array
	if (isLetterInWord) {
		for (var i = 0; i < numBlanks; i++) {
			if (selectedWord[i] == letter) {
				blanksAndSuccesses[i] = letter;
			}
		}
	} else {
		wrongLetters.push(letter);
		guessesLeft--
		for (var i = 0; i < gallowsArray.length; ++i) {
			gallowsImage = document.getElementById("gallows").src = gallowsArray[i];
		}

	}

	//Testing
	console.log(blanksAndSuccesses);
}

//------------------------------------------------------------------------------------

// function drawHangman () {
// 	if (guessesLeft == 9) {
// 		document.getElementById("gallows").src = "assets/images/hangman1.png"

// 		document.onkeyup = function(e) {
//     var image = document.getElementById('x');

//     //Left Key
//     if (event.keyCode == 37) {
//         previous();
//         //Right Key
//     } else if (event.keyCode == 39) {
//         next();
//     }
// }
// 	}
// }

//------------------------------------------------------------------------------------

function roundComplete () {
	console.log("Wins: " + winCount + " Guesses Left: " + guessesLeft);
	
	document.getElementById("hidden-letters").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("incorrect-letters").innerHTML = wrongLetters.join(" ")
	document.getElementById("guesses-left").innerHTML = guessesLeft;


	if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You Won!");
		document.getElementById("win-count").innerHTML = winCount;
		startGame();
	} else if (guessesLeft == 0){
		alert("You Lost")
		startGame();
	}
}



//MAIN PROCESSES
//------------------------------------------------------------------------------------


startGame();

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();

	console.log(letterGuessed);
}