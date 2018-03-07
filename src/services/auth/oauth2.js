import oauth2orize from 'oauth2orize'
import passport from 'passport'
// import crypto from 'crypto'
import login from 'connect-ensure-login'

import utils from '../../services/utils'

import Users from '../../models/users'
import AccessTokens from '../../models/access_tokens'
import AuthorizationCodes from '../../models/authorization_codes'
import Clients from '../../models/clients'

const server = oauth2orize.createServer()
server.serializeClient((client, done) => done(null, client.id))

server.deserializeClient((id, done) => {
  Clients.findById(id, (error, client) => {
    if (error) return done(error)
    return done(null, client)
  })
})

server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, done) => {
  const code = utils.getUid(16)
  AuthorizationCodes.save(code, client.id, redirectUri, user.id, (error) => {
    if (error) return done(error)
    return done(null, code)
  })
}))

server.grant(oauth2orize.grant.token((client, user, ares, done) => {
  const token = utils.getUid(256)
  AccessTokens.save(token, user.id, client.clientId, (error) => {
    if (error) return done(error)
    return done(null, token)
  })
}))

server.exchange(oauth2orize.exchange.code((client, code, redirectUri, done) => {
  AuthorizationCodes.find(code, (error, authCode) => {
    if (error) return done(error)
    if (client.id !== authCode.clientId) return done(null, false)
    if (redirectUri !== authCode.redirectUri) return done(null, false)

    const token = utils.getUid(256)
    AccessTokens.save(token, authCode.userId, authCode.clientId, (error) => {
      if (error) return done(error)
      return done(null, token)
    })
  })
}))

server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  // Validate the client
  Clients.findByClientId(client.clientId, (error, localClient) => {
    if (error) return done(error)
    if (!localClient) return done(null, false)
    if (localClient.clientSecret !== client.clientSecret) return done(null, false)
    // Validate the user
    Users.findByUsername(username, (error, user) => {
      if (error) return done(error)
      if (!user) return done(null, false)
      if (password !== user.password) return done(null, false)
      // Everything validated, return the token
      const token = utils.getUid(256)
      AccessTokens.save(token, user.id, client.clientId, (error) => {
        if (error) return done(error)
        return done(null, token)
      })
    })
  })
}))

server.exchange(oauth2orize.exchange.clientCredentials((client, scope, done) => {
  Clients.findByClientId(client.clientId, (error, localClient) => {
    if (error) return done(error)
    if (!localClient) return done(null, false)
    if (localClient.clientSecret !== client.clientSecret) return done(null, false)
    // Everything validated, return the token
    const token = utils.getUid(256)
    // Pass in a null for user id since there is no user with this grant type
    AccessTokens.save(token, null, client.clientId, (error) => {
      if (error) return done(error)
      return done(null, token)
    })
  })
}))

const authorization = [
  login.ensureLoggedIn(),
  server.authorization((clientId, redirectUri, done) => {
    Clients.findByClientId(clientId, (error, client) => {
      if (error) return done(error)
      return done(null, client, redirectUri)
    })
  }, (client, user, done) => {
    if (client.isTrusted) return done(null, true)

    AccessTokens.findByUserIdAndClientId(user.id, client.clientId, (_, token) => {
      if (token) return done(null, true)
      return done(null, false)
    })
  }),
  (request, response) => {
    response.render('dialog', { transactionId: request.oauth2.transactionID, user: request.user, client: request.oauth2.client })
  }
]

const decision = [
  login.ensureLoggedIn(),
  server.decision()
]

const token = [
  passport.authenticate(['oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler()
]

export default {
  authorization,
  decision,
  token
}
