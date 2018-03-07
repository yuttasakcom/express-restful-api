import { Router } from 'express'
import oauth2 from '../services/auth/oauth2'

const router = Router()

// OAuth2
router.post('/oauth/token', oauth2.token)

router.get('/', (req, res) => {
  res.end('Api')
})

export default router
