import { Response, Request } from "express"
import { getOAuthToken } from "../utils/getOAuthToken"
import jwt, { JwtPayload } from "jsonwebtoken"
import pool from "../utils/database"
import { getUser, getUserbyEmail, insertUser } from "./queries"
import { signJwt } from "../utils/jwt"
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
    let checkUser = await client.query(getUserbyEmail, [email])

    if (checkUser.rowCount === 0){
      const newInsertedUser = await client.query(insertUser, [googleUser.name, googleUser.email, googleUser.picture])
      console.log(newInsertedUser)
      await client.query('COMMIT');
      checkUser = await client.query(getUserbyEmail, [email])
    }
    req.session.user = {user: checkUser.rows[0]} as any
    const access_token:string = signJwt({...checkUser, session: req.session.user}, {expiresIn: "15m"})
    const refresh_token:string = signJwt({...checkUser, session: req.session.user}, {expiresIn: "1y"})
    res.cookie("access_token", access_token, {
      maxAge: 900000, // 15 mins
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    })

    res.cookie("refresh_token", refresh_token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    console.log(checkUser.rows[0].id)
    res.json(checkUser.rows)
  } catch(e){
    console.log(e)
  }
}