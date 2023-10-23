import express, { Application, Request, Response} from 'express'
import cors from 'cors'
import { auth } from 'express-oauth2-jwt-bearer'; //claimCheck, requireScope, ...
import axios from 'axios'
import Database from './config/database';
import CompetitionRouter from './router/CompetitionRouter';
import UserInfoRouter from './router/UserInfoRouter';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.use(cors());
    this.app.route('/').get((req: Request, res: Response) => {
      res.send("welcome to the api")
    });

    this.app.use("/api/v1/user", UserInfoRouter);
  }
}

const app = new App().app;
//app.use(cors());

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
