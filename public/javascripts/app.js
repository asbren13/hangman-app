var app = angular.module('hangmanApp', []);

app.controller('AppController', function($scope, randomWordFactory) {
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
			$scope.guessArray.push(guess);
			
		} else if($scope.guessArray.indexOf(guess) === 1){
			$scope.duplicateLetter = true;
		}

		$scope.form.letter = "";
	}

	function wrongGuess(){
		$scope.updateImg();
	}


	function lostGame(){
		$scope.gameStatus = "Game Over :(";
	}

	function winGame(){
		$scope.gameStatus = "Congrats! You won!";

	}

	$scope.updateImg = () => {
		attempts++;
		if(attempts > maxGuesses){
			lostGame();
		} else {
			$scope.hangmanImg = `/images/hangman-${attempts}.png`;
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
        console.log('in random word factory');
        return wordData;
    };
    
    return {
        getRandomWord: getRandomWord 
    };
}]);

