import Router from 'koa-router'
import Order from '../dbs/models/order'
import Cart from '../dbs/models/cart'

const router = new Router({ prefix: '/order' })

router.post('/createOrder', async (ctx) => {
  const { id, count } = ctx.request.body.params
  const time = Date.now()
  const orderID = (Math.random() * 1000 + time).toString()

  const findCart = await Cart.findOne({ cartNo: id })
  const order = new Order({
    user: ctx.session.passport.user,
    orderID,
    price: findCart.detail[0].price,
    count,
    name: findCart.detail[0].name,
    status: 0,
    time
  })
  try {
    const result = await order.save()
    if (result) {
      ctx.body = {
        code: 0,
        orderID
      }
    } else {
      ctx.body = {
        code: -1
      }
    }
  } catch (e) {
    ctx.body = {
      code: -1
    }
  }
})

router.post('/getOrder', async (ctx) => {
  try {
    const result = await Order.find({ user: ctx.session.passport.user })
    if (result) {
      ctx.body = {
        code: 0,
        list: result
      }
    } else {
      ctx.body = {
        code: -1
      }
    }
  } catch (e) {
    ctx.body = {
      code: -1
    }
  }
})

export default router
