<template>
  <div class="m-geo">
    <i class="el-icon-location"></i>{{$store.state.geo.position.city}}
    <nuxt-link to="/changeCity" class="changeCity">
      切换城市 
    </nuxt-link>
    [天津 廊坊 雅安]
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
