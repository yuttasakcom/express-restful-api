import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
    res.end('Api')
})

export default router