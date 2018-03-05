import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'

import ratelimit from './middleware/ratelimit'
import routes from './routes'

const app = express()

app.enable('trust proxy')
app.disable('x-powered-by')

app.set('host', process.env.HOST || '127.0.0.1')
app.set('port', process.env.PORT || '3000')

app.use(ratelimit)
app.use(helmet())
app.use(morgan('common'))
app.use(compression())

routes(app)

export default app
