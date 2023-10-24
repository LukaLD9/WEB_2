var express = require('express');
var Match = require('../models/MatchModel');
var router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        let result = await Match.dbGetAllMatches();
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async function(req, res, next) {
    try {
        let result = await Match.dbGetAllMatchesByCompetitionId(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/', async function(req, res, next) {
    try {
        let match = new Match(
            req.body.idMatch,
            req.body.scoreFirst,
            req.body.scoreSecond,
            req.body.round,
            req.body.date,
            req.body.played,
            req.body.idCompetition,
            req.body.idCompetitorFirst,
            req.body.idCompetitorSecond
        );
        let result = await Match.dbUpdateMatch(match);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;