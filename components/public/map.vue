<template>
  <div :id="id" :style="{width:width+'px',height:height+'px',margin:'34px auto'}"></div>
</template>

<script>
export default {
  props: {
    width:{
      type:Number,
      default:300
    },
    height:{
      type:Number,
      default:300
    },
    center:{
      type:Array,
      default(){
        return [116.397428, 39.90923]
      }
    }
  },
  data () {
    return {
      id:'mtapp',
      key: '20ccfcfd87edb3ccc59cfd250d495f21'
    }
  },
  mounted () {
    let self = this
    self.id = `mt-app${Math.random().toString().slice(4,6)}`

    window.onmaploaded  = function(){
      var map = new AMap.Map(self.id, {
        zoom:11,
        center: self.center,
        resizeEnable: true,
      })
      AMap.plugin(['AMap.ToolBar',],function(){//异步同时加载多个插件
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
        var marker = new AMap.Marker({
          position:self.center
        })
        map.add(marker);
      });
    }
    var url = `https://webapi.amap.com/maps?v=1.4.13&key=${self.key}&callback=onmaploaded`
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }

}
</script>

<style>

</style>
