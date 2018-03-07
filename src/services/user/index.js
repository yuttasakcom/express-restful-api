import passport from 'passport'

const me = [
  passport.authenticate('bearer', { session: false }),
  (request, response) => {
    response.json({ id: request.user.id, name: request.user.name, scope: request.authInfo.scope })
  }
]

const signup = passport.authenticate('local-signup')

export default {
  me,
  signup
}
