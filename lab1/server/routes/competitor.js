var express = require('express');
var Competitor = require('../models/CompetitorModel');
const { route } = require('./match');
var router = express.Router();

router.get('/:id', async function(req, res, next) {
    try {
        let result = await Competitor.dbGetAllCompetitorsByCompetitionId(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/withName', async function(req, res, next) {
    try {
        let names = req.body.names;
        let idCompetition = req.body.idCompetition;
        let result = await Competitor.dbInsertCompetitorsNames(names, idCompetition);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/competitionId/:id', async function(req, res, next) {
    try {
        let result = await Competitor.dbGetCompetitionIdOfCompetitor(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;

