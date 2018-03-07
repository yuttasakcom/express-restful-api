import { Router } from 'express'
import oauth2 from '../services/auth/oauth2'
import user from '../services/user'

const router = Router()

// OAuth2
router.post('/oauth/token', oauth2.token)

// user
router.post('/user/signup', user.signup, (req, res) => res.json(req.user))
router.get('/user/me', user.me)

router.get('/', (req, res) => {
  res.end('express restful api')
})

export default router
