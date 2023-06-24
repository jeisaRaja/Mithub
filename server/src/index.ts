import router from './routes.js';
import express, {Request, Response} from 'express'
import 'dotenv/config'
import session from 'express-session'
import genFunc from 'connect-pg-simple'
import config from 'config'


const server = express();
server.use(express.json());

// SESSION STORE
const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: `postgres://${process.env.DB_Username}:${process.env.DB_Password}@localhost:5432/calendly`,
})

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

server.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: 
  {
    httpOnly:true,
    maxAge: 30000,
  },
  store: sessionStore
}));

server.use('/', router)

server.listen(5000, ()=>{
  console.log("Listening in port 5000");
})