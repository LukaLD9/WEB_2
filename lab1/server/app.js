process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const cors = require('cors');
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

var CompetitionRouter = require('./routes/competition');
var MatchRouter = require('./routes/match');
var PublicRouter = require('./routes/public');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.use("/api/public", PublicRouter);

app.use(jwtCheck);
app.use("/api/competition", CompetitionRouter);
app.use("/api/match", MatchRouter);


// app.use(function (req, res, next) {
//   next(createError(404));
// });

// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//   res.status(err.status || 500);
// });

module.exports = app;

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 5000;

if(externalUrl){
  const hostname = '0.0.0.0';
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ and from outside on ${externalUrl}`);
  });
} else {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}
