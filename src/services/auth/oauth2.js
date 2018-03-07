import oauth2orize from 'oauth2orize'
import passport from 'passport'
import crypto from 'crypto'

import Users from '../../models/users'
import AccessTokens from '../../models/access_tokens'
import RefreshTokens from '../../models/refresh_tokens'

const server = oauth2orize.createServer()

const errFn = (cb, err) => {
  if (err) return cb(err)
}

const generateTokens = (data, done) => {
  const errorHandler = errFn.bind(undefined, done)
  let refreshToken,
    refreshTokenValue,
    token,
    tokenValue

  RefreshTokens.remove(data, errorHandler)
  AccessTokens.remove(data, errorHandler)

  tokenValue = crypto.randomBytes(32).toString('hex')
  refreshTokenValue = crypto.randomBytes(32).toString('hex')

  data.token = tokenValue
  token = new AccessTokens(data)

  data.token = refreshTokenValue
  refreshToken = new RefreshTokens(data)

  refreshToken.save(errorHandler)

  token.save(err => {
    if (err) return done(err)
    done(null, tokenValue, refreshTokenValue, {
      'expires_in': process.env.TOKEN_MAX_AGE
    })
  })
}

server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
  Users.findOne({ username: username }, function (err, user) {
    if (err) return done(err)

    if (!user || !user.checkPassword(password)) return done(null, false)

    var model = {
      userId: user.userId,
      clientId: client.clientId
    }

    generateTokens(model, done)
  })
}))

const token = [
  passport.authenticate(['oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler()
]

export default {
  token
}
