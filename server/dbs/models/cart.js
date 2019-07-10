import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  detail: {
    type: Array,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  },
  cartNo: {
    type: String,
    require: true
  }
})

export default mongoose.model('Cart', cartSchema)
