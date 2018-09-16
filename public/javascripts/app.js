var app = angular.module('hangmanApp', []);

app.controller('AppController', function($scope, randomWordFactory, guessFactory) {
	const maxGuesses = 10;
	var attempts; 
	$scope.gameStatus = "Ready to Get Started?";
	$scope.gameStarted = false;

	function init(){
		$scope.gameStarted = true;
		$scope.words = [];
		$scope.theGameWord = "";
		$scope.completedWord = "";
		$scope.guessArray = [];
		$scope.showCorrectWord = "";
		$scope.gameStatus = "Game Started! Good Luck";
		$scope.errorMsg = "";
		attempts = 0;
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
			slots += '_____ ';
		}
		return slots;
	}

	$scope.submitGuess = () => {
		$scope.duplicateLetter = false;
		var guess = $scope.form.letter;
		if($scope.guessArray.indexOf(guess) === -1){
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
			$scope.guessArray.push(letter);
			$scope.guessesLeft = maxGuesses - attempts;
		} else {
			var wordLength = $scope.wordSlots.split(' ');
			var letterCount = res.letterPositions.length;
			for(var i = 0; i < letterCount; i++){
				wordLength[res.letterPositions[i]] = letter
			}
			$scope.wordSlots = wordLength.join(' ');
		}
	}

	$scope.restartGame = () => {
        init();
    }

    $scope.beginGame = () =>{
		init();
    }
});

app.factory("randomWordFactory", ["$http", function($http){
    
    var getRandomWord = function(){
        var wordData = $http.get('/api/word/random');
        return wordData;
    };
    
    return {
        getRandomWord: getRandomWord 
    };
}]);

app.factory("guessFactory", ["$http", function($http){
    
    var isValidLetter = function(letter){
        var letterData = $http.post('/api/word/validate',{
        	letter: letter
        });
        return letterData;
    };
    
    return {
        isValidLetter: isValidLetter 
    };
}]);
