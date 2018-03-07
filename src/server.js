import http from 'http'
import app from './app'

const server = http.createServer(app)

server.listen(app.get('port'), app.get('host'), () => {
  console.log(`Server is running on http://${app.get('host')}:${app.get('port')}`)
  console.log('Press CTRL-C to stop')
})

export default server
