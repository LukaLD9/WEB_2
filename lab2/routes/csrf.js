const express = require('express');
const db = require('../db');
var csrf = require('csurf');
const bodyParser = require('body-parser');
const router = express.Router()
const dotenv = require('dotenv');

// csrf protection
var parseForm = bodyParser.urlencoded({ extended: false })
var csrfProtect = csrf({ cookie: true })

// flag for toggling between secure and insecure mode
var isSecure = false;

router.get('/', csrfProtect , async (req,res) => {
  // this is for the purpose of the demo, to show how to log in
  const query = `SELECT * FROM csrf_users LIMIT 1`;
  const result = await db.query(query);

  const session = req.session;
  if(session.username) {
      res.render('csrf', {username: session.username, messages: [], isSecure, csrfToken: req.csrfToken()});
  }
  else {
      res.render('csrf', {username: null, messages: [], isSecure: false, user: result[0], csrfToken: req.csrfToken()});
  }
});

// for logging in
router.post('/', async (req,res) => {
  const query = `SELECT * FROM csrf_users WHERE username = $1 AND password = $2`;
  const result = await db.query(query, [req.body.username, req.body.password]);
  if(result[0]) {
      req.session.username = req.body.username;
      res.render('csrf', {username: req.body.username, messages: [], isSecure});
  }
  else {
    res.render('csrf', {username: null, messages: [], isSecure});
  }
});

// for logging out
router.get('/logout', async (req,res) => {
  req.session.destroy();
  res.redirect('/csrf');
});


// unsecure change username it uses GET
router.get('/change_username', async (req,res) => {
  if(isSecure || req.query.new_username === undefined || req.query.new_username === null || req.query.new_username === '') {
    res.redirect('/csrf');
    return;
  }
  const query = `UPDATE csrf_users SET username = $1 WHERE username = $2`;
  await db.query(query, [req.query.new_username, req.session.username]);
  req.session.username = req.query.new_username;
  res.redirect('/csrf');
});


// secure change username it uses POST, and it is protected by csrfProtect
router.post('/change_username/secure', parseForm, csrfProtect ,async (req,res) => {
  if(req.body.new_username === undefined || req.body.new_username === null || req.body.new_username === '') {
    res.redirect('/csrf');
    return;
  }
  const query = `UPDATE csrf_users SET username = $1 WHERE username = $2`;
  await db.query(query, [req.body.new_username, req.session.username]);
  req.session.username = req.body.new_username;
  res.redirect('/csrf');
});


// for displaying messages
// second message is a CSRF attack
router.get('/messages', csrfProtect, (req,res) => {
  const messages = [
    {"author": "Frend", "text": "E bok kako si? Nadam se da ni tebe nisu hakirali, pokušaj refreshati stranicu!"},
    {"author": "Haker", "text":
    `<img src="${process.env.BASE_URL}/csrf/change_username?new_username=HAKIRAN_SI" width="0" height="0" />
    Ovakva nevidljiva slika:
    &lt;img src="${process.env.BASE_URL}/csrf/change_username?new_username=HAKIRAN_SI" width="0" height="0" /&gt
    `}
  ];
  res.render('csrf', {username: req.session.username , messages, isSecure, csrfToken: req.csrfToken()});
});

// for toggling between secure and insecure mode
router.post('/toggle', (req,res) => {
  isSecure = !isSecure;
  res.redirect('/csrf');
});

module.exports = router;
