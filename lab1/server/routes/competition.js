var express = require('express');
var Competition = require('../models/CompetitionModel');
var router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        let result = await Competition.dbGetAllCompetitions();
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user/:id', async function(req, res, next) {
    try {
        let result = await Competition.dbGetCompetitionsByUserId(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async function(req, res, next) {
    try {
        let competition = new Competition(
            req.body.name,
            undefined,
            req.body.system,
            req.body.idUser
        );
        let result = await Competition.dbInsertCompetition(competition);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/create', async function(req, res, next) {
    try {
        let competition = new Competition(
            req.body.name,
            undefined,
            req.body.system,
            req.body.idUser
        );
        let competitorNames = req.body.competitors;
        let result = await Competition.dbCreateCompetitionWithCompetitorsAndMatches(competition, competitorNames);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/system/:id', async function(req, res, next) {
    try {
        let result = await Competition.dbGetCompetitionSystem(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;