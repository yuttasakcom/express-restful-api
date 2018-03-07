import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import errorHandler from 'errorhandler'
import passport from 'passport'
import cookieSession from 'cookie-session'

import './database/mongodb'
import ratelimit from './middleware/ratelimit'
import routes from './routes'
import './services/passport'

dotenv.config({ path: '../.env' })

const app = express()

app.enable('trust proxy')
app.disable('x-powered-by')

app.set('host', process.env.HOST || '127.0.0.1')
app.set('port', process.env.PORT || '3000')

app.use(helmet())
app.use(ratelimit)
app.use(compression())
app.use(morgan('common'))
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: process.env.COOKIE_SESSION_MAX_AGE
}))
app.use(bodyParser.json({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(errorHandler())
app.use(passport.initialize())
app.use(passport.session())

routes(app)

export default app
