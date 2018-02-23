import { Router } from 'express'

import users from './users'

const router = Router()

router.use(users)

export default router
