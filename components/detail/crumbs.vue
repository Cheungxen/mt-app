<template>
  <div class="m-crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        {{city}}美团
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{city}}{{type}}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{city}}{{keyword}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    keyword:{
      type:String,
      default: ''
    },
    type:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      city:this.$store.state.geo.position.city.replace('市','')
    }
  }
}
</script>

<style>

</style>
