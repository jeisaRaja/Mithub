import { Response, Request } from "express"
export default function loginHandler(req: Request, res: Response){
  const code = req.query.code as string
  res.json({
    code: code,
  })
}