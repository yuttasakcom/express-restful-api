import http from 'http'
import app from './app'

const server = http.createServer(app)

server.listen(app.get('port'), app.get('host'), () => {
  console.log(`Server running at http://${app.get('host')}:${app.get('port')}`)
  console.log('Press CTRL-C to stop')
})
