import api from './api'

export default app => {
  app.use('/api', api)

  app.use((req, res, next) => {
    res.status(404)

    res.json({
      error: 'Not found'
    })
  })

  app.use((err, req, res, next) => {
    res.status(err.status || 500)

    res.json({
      error: err.message
    })
  })
}
