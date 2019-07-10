<template>
  <div class="m-hcity">
    <dl>
      <dt>热闹城市：</dt>
      <dd v-for="(item,idx) in list" :key="idx">{{item.name==="市辖区"?item.province:item.name}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list:[]
    }
  },
  async mounted () {
    const self = this
    let {status,data:{hots}} = await self.$axios.get('/geo/hotCity')
    if (status===200) {
      self.list = hots
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/hot.scss";
</style>
