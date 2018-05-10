const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
	const randomId = Math.floor(Math.random() * (cards.length - 1));
	res.redirect(`/cards/${randomId}`);
});

router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
	if(!side) {
		return res.redirect(`/cards/${id}?side=question`);
	}
	const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];
    const templateData = { id, text, name, side };
    if(side === 'question') {
    	templateData.hint = hint;
    	templateData.sideToShow = 'answer';
    } else {
    	templateData.sideToShow = 'question';
    }

     res.render('card', templateData);
});

module.exports = router;
