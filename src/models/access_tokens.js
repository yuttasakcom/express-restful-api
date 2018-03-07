const tokens = {}

const find = (key, done) => {
  if (tokens[key]) return done(null, tokens[key])
  return done(new Error('Token Not Found'))
}

const findByUserIdAndClientId = (userId, clientId, done) => {
  for (const token in tokens) {
    if (tokens[token].userId === userId && tokens[token].clientId === clientId) return done(null, token)
  }
  return done(new Error('Token Not Found'), null)
}

const save = (token, userId, clientId, done) => {
  tokens[token] = { userId, clientId }
  done()
}

export default {
  find,
  findByUserIdAndClientId: findByUserIdAndClientId,
  save
}
