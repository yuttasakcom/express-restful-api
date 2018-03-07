import passport from 'passport'
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password'
import { Strategy as BearerStrategy } from 'passport-http-bearer'

import Users from '../../models/users'
import AccessTokens from '../../models/access_tokens'
import Clients from '../../models/clients'

passport.use(new ClientPasswordStrategy(
  (clientId, clientSecret, done) => {
    Clients.findOne({ clientId: clientId }, (err, client) => {
      if (err) return done(err)

      if (!client) return done(null, false)

      if (client.clientSecret !== clientSecret) return done(null, false)

      return done(null, client)
    })
  }
))

passport.use(new BearerStrategy(
  (accessToken, done) => {
    AccessTokens.findOne({ token: accessToken }, (err, token) => {
      if (err) return done(err)

      if (!token) return done(null, false)

      if (Math.round((Date.now() - token.created) / 1000) > process.env.TOKEN_MAX_AGE) {
        AccessTokens.remove({ token: accessToken }, err => {
          if (err) return done(err)
        })

        return done(null, false, { message: 'Token expired' })
      }

      Users.findById(token.userId, (err, user) => {
        if (err) return done(err)

        if (!user) return done(null, false, { message: 'Unknown user' })

        const info = { scope: '*' }
        done(null, user, info)
      })
    })
  }
))
