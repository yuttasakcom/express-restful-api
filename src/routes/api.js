import { Router } from 'express'
import oauth2 from '../services/auth/oauth2'
import user from '../services/user'

const router = Router()

// OAuth2
router.post('/oauth/token', oauth2.token)

// Users
router.get('/user/me', user.info)

router.get('/', (req, res) => {
  res.end('express restful api')
})

export default router
