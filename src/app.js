import express from 'express'

import api from '@/routes'

const app = express()

app.set('host', process.env.HOST || '127.0.0.1')
app.set('port', process.env.PORT || '3000')

app.use('/api', api)

export default app
