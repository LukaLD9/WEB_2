var express = require('express');
var Competition = require('../models/CompetitionModel');
var router = express.Router();

// private
router.get('/user/:id', async function(req, res, next) {
    try {
        let result = await Competition.dbGetCompetitionsByUserId(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// private
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

module.exports = router;