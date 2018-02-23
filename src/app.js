import express from 'express'

const app = express()

app.set('host', process.env.HOST || '127.0.0.1')
app.set('port', process.env.PORT || '3000')

app.get('/', (req, res) => {
  res.end('NodeJS RestFul Apis!')
})

export default app
