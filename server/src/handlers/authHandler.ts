import { Response, Request } from "express"
import { getOAuthToken } from "../utils/getOAuthToken"
import jwt, { JwtPayload } from "jsonwebtoken"
import pool from "../utils/database"
import { getUser, getUserbyEmail, insertUser } from "./queries"
function getUserFromToken(token:string):User{
  const decoded = jwt.decode(token) as JwtPayload
  const user = {
    name: decoded?.name ?? ' ',
    email: decoded?.email ?? ' ',
    picture: decoded?.picture
  };
  return user
}

interface User {
  name: string,
  email: string,
  picture: string
}
export async function loginHandler(req: Request, res: Response){
  const code = req.query.code as string
  const {id_token, access_token} = await getOAuthToken(code)
  const googleUser:User = getUserFromToken(id_token)
  const email = googleUser.email
  const client = await pool.connect()
  try{
    await client.query("BEGIN")
    const isUserExist = await client.query(getUserbyEmail, [email])
    if (isUserExist.rowCount === 0){
      const newInsertedUser = await client.query(insertUser, [googleUser.name, googleUser.email, googleUser.picture])
      await client.query('COMMIT');
      return res.json(newInsertedUser)
    }
    res.json(isUserExist.rows)
  } catch(e){
    console.log(e)
  }
}