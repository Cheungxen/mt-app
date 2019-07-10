import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  username: { type: String, unique: true, require: true },
  email: { type: String, unique: true },
  password: { type: String, unique: true }
})

export default mongoose.model('User', UserSchema)
