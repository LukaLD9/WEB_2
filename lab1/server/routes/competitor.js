var express = require('express');
var Competitor = require('../models/CompetitorModel');
const { route } = require('./match');
var router = express.Router();

router.get('/byCompetition/:id', async function(req, res, next) {
    try {
        let result = await Competitor.dbGetAllCompetitorsByCompetitionId(req.params.id);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;


