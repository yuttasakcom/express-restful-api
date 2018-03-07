const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const mongodbHOST = process.env.MONGODB_HOST || 'localhost'
const mongodbPORT = process.env.MONGODB_PORT || '27017'
const mongodbDB = process.env.MONGODB_DB_NAME || 'apis'

mongoose.connect(`mongodb://${mongodbHOST}:${mongodbPORT}/${mongodbDB}`)

export default mongoose
