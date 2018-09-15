var app = angular.module('hangmanApp', []);

app.controller('AppController', function($scope, $http, $rootScope) {
	

	function init(){
		$scope.words = [];
		$scope.theGameWord = "";
		$scope.completedWord = "";
		$scope.guess = "";
		$scope.attempts = 0;
		$scope.showCorrectWord = "";
		$scope.gameStatus = "Ready to Get Started?";

		startGame();
	}

	function startGame() {
		$scope.initialImg = '/images/hangman-0.png';
	}


	$scope.restartGame = () => {
        init();
    }

	init();
});