import { Router } from 'express'
import UsersController from '@/controllers/UsersController'

const router = Router()

const users = (req, res) => new UsersController(req, res)

router.get('/users', (req, res) => users(req, res).get())
router.get('/users/:id', (req, res) => users(req, res).getById())

export default router
