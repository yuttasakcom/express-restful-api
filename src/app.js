import express from 'express'
import morgan from 'morgan'
import routes from './routes'

const app = express()

app.set('host', process.env.HOST || '127.0.0.1')
app.set('port', process.env.PORT || '3000')

app.use(morgan())

routes(app)

export default app
