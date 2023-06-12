import { Response, Request } from "express"
import { getOAuthToken } from "../utils/getOAuthToken"
import jwt from "jsonwebtoken"
export default async function loginHandler(req: Request, res: Response){
  const code = req.query.code as string
  const {id_token, access_token} = await getOAuthToken(code)
  console.log({id_token, access_token})
  const decoded = jwt.decode(id_token)
  console.log(decoded)
  res.json({
    code: code,
  })
}