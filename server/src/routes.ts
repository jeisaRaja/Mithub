import express, {Router, Request, Response} from 'express'
import {loginHandler} from './handlers/authHandler'
import { getUser } from './utils/getUser'
const router = Router()

router.route('/')
.get((req: Request, res: Response) => {res.json({status: "success", username: "not specified"})})

router.route('/api/oauth/google')
.get(loginHandler)

router.route('/api/users')
.get(getUser)




export default router