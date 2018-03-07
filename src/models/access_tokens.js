import mongoose from 'mongoose'

const AccessTokens = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  clientId: {
    type: String,
    required: true
  },

  token: {
    type: String,
    unique: true,
    required: true
  },

  created_at: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('access_tokens', AccessTokens)
