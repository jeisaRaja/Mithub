import pool from './database'

export function getUser(req:any,res:any){
  pool.query("SELECT * FROM USERS", (error, results)=>{
    if (error) throw error
    res.status(200).json(results.rows)
  })
}
