<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <category :categoryList="categoryList" :areaList="areaList"  />
      <list :list="list" />
    </el-col>
    <el-col :span="5">
      <amap v-if="point.length" :width="230" :height="290" :center="point"/>
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '../components/products/crumbs'
import Category from '../components/products/category'
import List from '../components/products/list'
import Amap from '../components/public/map'
export default {
  components: {
    Crumbs,
    Category,
    List,
    Amap
  },
  data () {
    return {
      keyword:'',
      categoryList:[],
      areaList:[],
      list:[],
      point:[]
    }
  },
  async asyncData(ctx){
    let {keyword} = ctx.query
    let city = ctx.store.state.geo.position.city
    let {status, data:{pois,count}} = await ctx.$axios.get('/search/resultsByKeywords',{
      params: {
        city,
        keyword
      }
    })
    let {status:status2,data:{areas,types}} = await ctx.$axios.get('/categories/crumbs',{
      params:{
        city
      }
    })
    if (status===200&&status2===200) {
      console.log();
      return {
        list:pois.filter(item=>item.photos.length).map(item=>{
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random()*10000),
            rate: Number(item.biz_ext.rating),
            price: Math.floor(Math.random()*1000),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0]
          }
        }),
        areaList: areas.filter(item=>item.type!=='').slice(0,5),
        categoryList: types.filter(item=>item.type!=='').slice(0,5),
        point: (pois.find(item=>item.location).location ||'').split(','),
        keyword
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
