var express = require('express');
var Match = require('../models/MatchModel');
var router = express.Router();

// private
router.put('/result', async function(req, res, next) {
    try {
        let result = await Match.dbUpdateMatchResult(req.body.idMatch, req.body.scoreFirst, req.body.scoreSecond, req.body.idUser);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;