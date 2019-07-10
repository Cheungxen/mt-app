<template>
  <li
    class="m-detail-item">
    <dl class="section">
      <dd>
        <img/>
      </dd>
      <dd>
        <h4>{{ meta.name }}</h4>
        <p>
          <span v-if="meta.biz_ext&&meta.biz_ext.ticket_ordering">剩余：{{ Number(meta.biz_ext.ticket_ordering) }}</span>
          <span v-if="meta.deadline">截止日期：{{ meta.deadline }}</span>
        </p>
        <p>
          <span class="price">{{  cost }}</span>
          <sub>门店价{{  cost }}</sub>
        </p>
      </dd>
      <dd>
        <el-button
          type="warning"
          round
          @click="createCart">立即抢购</el-button>
      </dd>
    </dl>
  </li>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      cost: Math.floor(Math.random()*100)
    }
  },
  methods: {
    createCart: async function () {
      const self = this
      let {status, data:{id, code}} = await self.$axios.post('/cart/create', {
        params:{
          id: Math.random().toString().slice(3,9),
          detail:{
            name: self.meta.name,
            price: self.cost
          }
        }
      })
      if (status===200&&code===0) {
        location.href = `/cart/?id=${id}`
      }else{
        console.log('error'); 
      }
    }
  }
}
</script>

<style lang="scss">


</style>
