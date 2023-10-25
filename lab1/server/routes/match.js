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

router.get('/check/:id', async function(req, res, next) {
    try {
        let result = await Match.dbCheckMatchDateInPast(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/result', async function(req, res, next) {
    try {
        let result = await Match.dbUpdateMatchResult(req.body.idMatch, req.body.scoreFirst, req.body.scoreSecond);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;