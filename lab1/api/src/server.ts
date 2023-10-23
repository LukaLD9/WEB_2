import express from 'express'
import cors from 'cors'
import { auth } from 'express-oauth2-jwt-bearer'; //claimCheck, requireScope, ...
import axios from 'axios'

const app = express();
app.use(cors());

//const port = process.env.PORT || 8080;


const authServer = 'https://dev-gl3jwk8s5jnx4xpd.us.auth0.com';
const jwtCheck = auth({
  audience: 'competition monitoring api',
  issuerBaseURL: `${authServer}`,
  tokenSigningAlg: 'RS256'
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.use(jwtCheck);


app.get('/authorized', async function (req, res) {

  const accesstoken = req.auth!.token; //because of app.use(checkJwt)
  
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


const hostname = 'localhost';
const port = 5000; 
app.listen(port, hostname, () => {
  console.log(`Web API running at http://${hostname}:${port}/`);
});
