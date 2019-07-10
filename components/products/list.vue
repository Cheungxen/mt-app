<template>
  <div class="m-products-list">
    <dl>
      <dd v-for="(item, idx) in nav" :key="idx" :class="[item.name,item.active?'s-nav-active':'']">{{item.txt}}</dd>
    </dl>
    <ul>
      <item v-for="(item, idx) in list" :key="idx" :meta="item"/>
    </ul>
  </div>
</template>

<script>
import Item from './product'
export default {
  components: {
    Item
  },
  props: {
    list:{
      type:Array,
      dafault(){
        return []
      }
    }
  },
  data () {
    return {
      nav:[
        {name:'s-default',txt: '智能排序', active:true},
        {name:'s-price',txt: '价格最低', active:false},
        {name:'s-visit',txt: '人气最高', active:false},
        {name:'s-comment',txt: '评价最高', active:false},
      ] 
    }
  }

}
</script>

<style>

</style>
