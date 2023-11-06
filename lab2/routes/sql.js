//const app = require('../app');
const express = require('express');
const db = require('../db');

const router = express.Router()


router.get('/', (req,res) => {
  res.render('sql', {result: []})
});


router.post('/', async (req,res) => {
  const query = 
  `SELECT competitor.name as competitor, competition.name as competition
  FROM competitor
  JOIN competition ON competitor.idcompetition = competition.idcompetition
  WHERE competitor.name = '${req.body.name}'`;

  const result = await db.query(query);
  console.log(result);
  res.render('sql', {result})
});


router.post('/secure', async (req,res) => {
  if(typeof req.body.name != 'string') {
    res.send('Invalid input');
    res.end();
    return;
  }
  const query = 
    `SELECT competitor.name as competitor, competition.name as competition
    FROM competitor
    JOIN competition ON competitor.idcompetition = competition.idcompetition
    WHERE competitor.name = $1`;
  const result = await db.query(query, [req.body.name]);
  console.log(result);
  res.render('sql', {result})
});

module.exports = router;
