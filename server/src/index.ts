import router from './routes.js';
import express, {Request, Response} from 'express'
import 'dotenv/config'
import { Pool, Client } from 'pg'

const client = new Client()

const server = express();
server.use(express.json());

server.get('/', (req: Request, res: Response)=>{
  return res.send('Hello World!');
})

server.use('/', router)

server.listen(5000, ()=>{
  console.log("Listening in port 5000");
})