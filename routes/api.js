var express = require('express');
var router = express.Router();
var randomWords = require('random-words');

router.get('/word/random', function(req, res, next) {
	var randomWord = randomWords();
	var randomLength = randomWord.length;

	req.app.word = randomWord;

  	res.send({
  		randomLength: randomLength,
  		randomWord: randomWord
  	});
});

module.exports = router;

router.post('/word/validate', function(req, res, next){
	const rightWord = req.app.word;
	const letterGuessed = req.body.letter;
	var correct = false;
	var validLetters = [];
	var letterPositions = [];

	for(var i = 0; i < rightWord.length; i++){
		if(letterGuessed === rightWord[i]){
			correct = true;
			validLetters.push(letterGuessed);
			letterPositions.push(i);
		}
	}

	res.send({
		letterPositions: letterPositions,
		validLetters: validLetters,
		correct: correct
	})
})

