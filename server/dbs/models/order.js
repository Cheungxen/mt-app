import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  user: {
    type: String,
    require: true
  },
  orderID: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  count: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    require: true
  },
  time: {
    type: String,
    require: true
  }
})

export default mongoose.model('Order', orderSchema)
