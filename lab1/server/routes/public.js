var express = require('express');
var Competitor = require('../models/CompetitorModel');
var Match = require('../models/MatchModel');
var router = express.Router();

// public
router.get('/allcompetitors/:id', async function(req, res, next) {
    try {
        let result = await Competitor.dbGetAllCompetitorsByCompetitionId(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// public
router.get('/allmatches/:id', async function(req, res, next) {
    try {
        let result = await Match.dbGetAllMatchesByCompetitionId(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;