import Router from 'koa-router'
import axios from './utils/axios'
import sign from './utils/sign'

const router = new Router({ prefix: '/geo' })

router.get('/getPosition', async (ctx) => {
  const { status, data: { province, city } } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/getMenu', async (ctx) => {
  const { status, data: { menu } } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

router.get('/getProvince', async (ctx) => {
  const { status, data: { province } } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  // if (status===200) {
  //   ctx.body = {
  //     province
  //   }
  // } else {
  //   province: []
  // }
  ctx.body = {
    province: status === 200 ? province : []
  }
})

router.get('/province', async (ctx) => {
  const { status, data: { province } } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: status === 200 ? province : []
  }
})

router.get('/province/:id', async (ctx) => {
  const { status, data: { city } } =
    await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  ctx.body = {
    city: status === 200 ? city : []
  }
})

router.get('/city', async (ctx) => {
  const { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`)
  ctx.body = {
    city: status === 200 ? city : []
  }
})

router.get('/hotCity', async (ctx) => {
  const { status, data: { hots } } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`)
  ctx.body = {
    hots: status === 200 ? hots : []
  }
})

export default router
