import mongoose from 'mongoose'
import crypto from 'crypto'

const User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

User.methods.encryptPassword = password => crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')

User.virtual('userId').get(() => this.id)

User.virtual('password')
  .set(password => {
    this._plainPassword = password
    this.salt = crypto.randomBytes(128).toString('hex')
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(() => this._plainPassword)

User.methods.checkPassword = password => this.encryptPassword(password) === this.hashedPassword

export default mongoose.model('users', User)
