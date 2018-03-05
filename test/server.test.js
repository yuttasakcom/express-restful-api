/* global describe it */
import request from 'supertest'

import server from '../src/server'

describe('routes: /api', () => {
  it('should return Api response', done => {
    request(server)
      .get('/api')
      .expect('Api')
      .end(done)
  })
})
