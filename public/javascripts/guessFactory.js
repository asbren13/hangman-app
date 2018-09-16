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