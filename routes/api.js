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
