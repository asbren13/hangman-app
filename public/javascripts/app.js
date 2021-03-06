var app = angular.module('hangmanApp', []);

app.controller('AppController', function($scope, randomWordFactory, guessFactory) {
	const maxGuesses = 10;
	var attempts; 
	$scope.gameStatus = "Ready to Get Started?";
	$scope.gameStarted = false;
	$scope.gamesPlayed = 0;
	$scope.gamesWon = 0;
	$scope.gamesLost = 0;

	function init(){
		attempts = 0;
		$scope.gameOver = false;
		$scope.gameStarted = true;
		$scope.completedWord = [];
		$scope.guessArray = [];
		$scope.wrongGuessArray = [];
		$scope.gameStatus = "Game Started! Good Luck!";
		startGame();
	}

	function startGame() {
		$scope.hangmanImg = '/images/hangman-0.png';
		var gameData = randomWordFactory.getRandomWord();
		gameData.success(function(data){
			$scope.wordLength = data.randomLength;
			$scope.wordSlots = letterSlots();
		})
	}

	function letterSlots(){
		var wordLength = $scope.wordLength;
		var slots = "";
		for(var i = 0; i < wordLength; i++ ){
			slots += '__ ';
		}
		return slots;
	}

	$scope.submitGuess = () => {
		$scope.duplicateLetter = false;
		var guess = $scope.form.letter.toLowerCase();
		if($scope.guessArray.indexOf(guess) === -1){
			$scope.guessArray.push(guess);
			validateGuess(guess)
		} else if($scope.guessArray.indexOf(guess) === 1){
			$scope.duplicateLetter = true;
		}

		$scope.form.letter = "";
	}


	function validateGuess(letter) {
		var validLetter = guessFactory.isValidLetter(letter)

		validLetter.success(function(data){
			handleGuess(data, letter);
		})
	}

	function handleGuess(res, letter){
		var isCorrect = res.correct;
		if(!isCorrect){
			attempts++;
			$scope.hangmanImg = `/images/hangman-${attempts}.png`;
			$scope.wrongGuessArray.push(letter + '  ');
			$scope.guessesLeft = maxGuesses - attempts;
			if(attempts === 10){
				loseGame();
			}
		} else {
			var wordslots = $scope.wordSlots.split(' ');
			var letterCount = res.letterPositions.length;

			for(var i = 0; i < letterCount; i++){
				wordslots[res.letterPositions[i]] = letter;
				$scope.completedWord.push(letter);
			}

			if($scope.completedWord.length === $scope.wordLength){
				winGame();
			}

			$scope.wordSlots = wordslots.join(' ');
		}
	}

	function loseGame(){
		$scope.gameStatus = "You lost :( Try again!";
		$scope.gameOver = true;
		$scope.gamesPlayed = $scope.gamesPlayed + 1;
		$scope.gamesLost = $scope.gamesLost + 1;
	}

	function winGame(){
		$scope.gameStatus = "You won! Want to play again?";
		$scope.gameOver = true;
		$scope.gamesPlayed = $scope.gamesPlayed + 1;
		$scope.gamesWon = $scope.gamesWon + 1;
	}

	$scope.restartGame = () => {
        init();
    }

    $scope.beginGame = () =>{
		init();
    }
});
