import passport from 'passport'

const info = [
  passport.authenticate('bearer', { session: false }),
  (request, response) => {
    response.json({ id: request.user.id, name: request.user.name, scope: request.authInfo.scope })
  }
]

export default {
  info
}
