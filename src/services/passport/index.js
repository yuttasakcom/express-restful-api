import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password'
import { Strategy as BearerStrategy } from 'passport-http-bearer'

import Users from '../../models/users'
import AccessTokens from '../../models/access_tokens'
import Clients from '../../models/clients'

passport.use(new LocalStrategy(
  (username, password, done) => {
    Users.findByUsername(username, (error, user) => {
      if (error) return done(error)
      if (!user) return done(null, false)
      if (user.password !== password) return done(null, false)
      return done(null, user)
    })
  }
))

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  Users.findById(id, (error, user) => done(error, user))
})

const verifyClient = (clientId, clientSecret, done) => {
  Clients.findByClientId(clientId, (error, client) => {
    if (error) return done(error)
    if (!client) return done(null, false)
    if (client.clientSecret !== clientSecret) return done(null, false)
    return done(null, client)
  })
}

passport.use(new ClientPasswordStrategy(verifyClient))

passport.use(new BearerStrategy(
  (accessToken, done) => {
    AccessTokens.find(accessToken, (error, token) => {
      if (error) return done(error)
      if (!token) return done(null, false)
      if (token.userId) {
        Users.findById(token.userId, (error, user) => {
          if (error) return done(error)
          if (!user) return done(null, false)
          done(null, user, { scope: '*' })
        })
      } else {
        Clients.findByClientId(token.clientId, (error, client) => {
          if (error) return done(error)
          if (!client) return done(null, false)
          done(null, client, { scope: '*' })
        })
      }
    })
  }
))
