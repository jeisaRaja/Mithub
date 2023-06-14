import router from './routes.js';
import express, {Request, Response} from 'express'
import 'dotenv/config'



const server = express();
server.use(express.json());

server.use('/', router)

server.listen(5000, ()=>{
  console.log("Listening in port 5000");
})