import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const Users = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

Users.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
Users.methods.validPassword = password => bcrypt.compareSync(password, this.password)

export default mongoose.model('users', Users)
