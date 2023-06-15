import { Pool } from "pg";
import 'dotenv/config'

interface DBConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

const pool = new Pool(
  {
    host: process.env.DB_Host,
    port: parseInt(process.env.DB_Port!),
    database: process.env.DB_Database,
    user: process.env.DB_Username,
    password: process.env.DB_Password,
  } as DBConfig
)

export default pool