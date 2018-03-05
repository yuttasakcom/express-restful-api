import RateLimit from 'express-rate-limit'

const options = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0
}

export default () => new RateLimit(options)