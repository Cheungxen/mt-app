import Router from 'koa-router'
import Cart from '../dbs/models/cart'

const router = new Router({ prefix: '/cart' })

router.post('/create', async (ctx) => {
  const time = Date.now()
  const { params: { id, detail } } = ctx.request.body
  const cartNo = (Math.random() * 1000 + time).toString()

  const cart = new Cart({ id, cartNo, time, detail, user: ctx.session.passport.user })
  const result = await cart.save()
  if (result) {
    ctx.body = {
      id: cartNo,
      code: 0,
      msg: ''
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail'
    }
  }
})

router.post('/getCart', async (ctx) => {
  const id = ctx.request.body.id
  // 1、根据id在数据库中查询相应订单
  const result = await Cart.findOne(
    { cartNo: id }
  )
  // 2、返回相应订单数据
  if (result) {
    ctx.body = {
      code: 0,
      data: result.detail[0]
    }
  } else {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router
