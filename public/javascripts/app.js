var app = angular.module('hangmanApp', []);

app.controller('AppController', function($scope, randomWordFactory) {
	const maxGuesses = 10;
	var attempts; 

	function init(){
		$scope.words = [];
		$scope.theGameWord = "";
		$scope.completedWord = "";
		$scope.guessArray = [];
		$scope.showCorrectWord = "";
		$scope.gameStatus = "Ready to Get Started?";
		$scope.errorMsg = "";
		attempts = 0;
		startGame();
	}

	function startGame() {
		$scope.hangmanImg = '/images/hangman-0.png';
		var gameData = randomWordFactory.getRandomWord();
		gameData.success(function(data){
			console.log(data);
		})
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

	function lostGame(){
		$scope.gameStatus = "Game Over :(";
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

	init();
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