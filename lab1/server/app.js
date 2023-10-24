process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

var createError = require("http-errors");
const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const cors = require('cors');
const axios = require('axios');
var path = require("path");

const app = express();
app.use(cors());

require("dotenv").config();

const authServer = 'https://dev-gl3jwk8s5jnx4xpd.us.auth0.com';
const jwtCheck = auth({
  audience: 'competition monitoring api',
  issuerBaseURL: `${authServer}`,
  tokenSigningAlg: 'RS256'
});




app.get('/', function (req, res) {
  res.send('Hello World!');
});

var CompetitionRouter = require('./routes/competition');
var CompetitorRouter = require('./routes/competitor');
var MatchRouter = require('./routes/match');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/competition", CompetitionRouter);
app.use("/api/competitor", CompetitorRouter);

app.use(jwtCheck);
app.use("/api/match", MatchRouter);





app.get('/authorized', async function (req, res) {

  const accesstoken = req.auth.token; //because of app.use(checkJwt)
  
  try{
    const userInfoResponse = await axios.post(`${authServer}/userinfo`, {},  {
                                                    headers : {
                                                        Authorization : `Bearer ${accesstoken}`
                                                    }}); 
     const user = userInfoResponse.data;    
     console.log(user.sub);
     res.json(JSON.stringify(user));               
  }
  catch(err) {
    console.log('Error in userinfo call');
    console.log(err);
  } 
});



app.get('/protected', function (req, res) {
  res.send('Hello World from protected API!');
});




// app.use(function (req, res, next) {
//   next(createError(404));
// });

// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//   res.status(err.status || 500);
// });

module.exports = app;

const hostname = 'localhost';
const port = 5000; 
app.listen(port, hostname, () => {
  console.log(`Web API running at http://${hostname}:${port}/`);
});
