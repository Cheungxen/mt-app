<template>
  <div class="page-cart">
    <el-row>
      <el-col v-if="cart.length" :span="24" class="m-cart">
        <list :cartData="cart"/>
        <p>
          应付金额：<em class="money">￥{{total}}</em>
        </p>
        <div class="post">
          <el-button type="primary" @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else>购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
import list from '../components/cart/list'
export default {
  components: {
    list
  },
  data () {
    return {
      cart:[]
    }
  },
  computed: {
    total: function () {
      let total = 0
      this.cart.forEach(item=> {
        total += item.price * item.count
      })
      return total
    }
  },
  methods: {
    submit: async function () {
      const self = this
      const {status, data:{code, orderID}} = await self.$axios.post('/order/createOrder', {
        params:{
          id: self.cartNo,
          count: self.cart[0].count
        }
      })
      if (status===200&&code===0) {
        this.$alert(`恭喜您，已成功下单，订单号:${orderID}`,'下单成功',{
          confirmButtonText:'确定',
          callback:action=>{
            location.href='/order'
          }
        })
      }
    }
  },
  async asyncData(ctx){
    const id = ctx.query.id
    const {status, data:{ code, data:{name, price} }} = await ctx.$axios.post('/cart/getCart', {
      id
    })
    if (status===200&&code===0) {
      return {
        cart:[
          {
            name,
            price,
            count:1
          }
        ],
        cartNo: id
      }
    }else{
      cart:[]
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
