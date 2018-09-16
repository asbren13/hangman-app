app.factory("randomWordFactory", ["$http", function($http){
    
    var getRandomWord = function(){
        var wordData = $http.get('/api/word/random');
        return wordData;
    };
    
    return {
        getRandomWord: getRandomWord 
    };
}]);
