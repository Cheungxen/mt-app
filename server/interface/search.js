import Router from 'koa-router'
import axios from './utils/axios'
import sign from './utils/sign'

const router = new Router({ prefix: '/search' })

router.get('/top', async (ctx) => {
  const { status, data: { top } } = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      city: ctx.query.city,
      input: ctx.query.input,
      sign
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})

router.get('/hotPlace', async (ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  const { status, data: { result } } = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    params: {
      sign,
      city
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const { city, keyword } = ctx.query
  const { status, data: { count, pois } } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword,
      sign
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

router.get('/products', async (ctx) => {
  const keyword = ctx.query.keyword || '旅游'
  const city = ctx.query.city || '北京'
  const {
    status,
    data: {
      product,
      more
    }
  } = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city,
      sign
    }
  })
  // FIXME: 这里是否登录验证有问题
  if (status === 200) {
    ctx.body = {
      product,
      more: more,
      login: true
    }
  } else {
    ctx.body = {
      product: {},
      more: more,
      login: true
    }
  }
})

export default router
