import express, {Router, Request, Response} from 'express'
import loginHandler from './handlers/loginHandler'

const router = Router()

router.route('/')
.get
(
  (req: Request, res: Response) => {
    res.json(
      {
        status: "success",
        username: "not specified"
      }
    )
  }
)

router.route('/api/oauth/google')
.get(loginHandler)

export default router