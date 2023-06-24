import { Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";

export default function checkReqUser(req: RequestWithUser, res: Response){
  if(!req.session.user){
    res.json({msg:"there is no req user"})
  }
  res.json(req.session.user)
}