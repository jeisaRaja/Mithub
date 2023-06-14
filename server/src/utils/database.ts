import { Pool } from "pg";
import 'dotenv/config'

const pool = new Pool(
  {
    host: process.env.DB_Host,
    port: parseInt(process.env.DB_Port!),
    database: process.env.DB_Database,
    user: process.env.DB_Username,
    password: process.env.DB_Password,
  }
)

export default pool