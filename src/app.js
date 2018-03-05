import express from 'express'
import morgan from 'morgan'
import ratelimit from './middleware/ratelimit'
import routes from './routes'

const app = express()

app.enable('trust proxy')

app.set('host', process.env.HOST || '127.0.0.1')
app.set('port', process.env.PORT || '3000')

app.use(ratelimit())
app.use(morgan('common'))

routes(app)

export default app
