/* global describe it */
import request from 'supertest'

import server from '../src/server'

describe('routes: /api', () => {
  it('should return express restful api', done => {
    request(server)
      .get('/api')
      .expect('express restful api')
      .end(done)
  })
})
