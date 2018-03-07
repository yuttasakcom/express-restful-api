const getUid = length => {
  let uid = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charsLength = chars.length

  for (let i = 0; i < length; ++i) {
    uid += chars[getRandomInt(0, charsLength - 1)]
  }

  return uid
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export default {
  getUid,
  getRandomInt
}
