<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="省份">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span class="name">直接选择</span>
    <el-select
      v-model="input"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading">
      <el-option
        v-for="item in list"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      province:[],
      pvalue: '',
      city:[],
      cvalue:'',
      cities: [],
      list:[],
      input:'',
      loading: false
    }
  },
  async mounted () {
    const self = this
    let {status, data:{province}} = await self.$axios.get('/geo/province')
    if (status===200) {
      self.province = province.map(item=>{
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  watch: {
    pvalue: async function (newProvince) {
      const self = this
      let {status, data: {city}} = await self.$axios.get(`/geo/province/${newProvince}`)
      if (status===200) {
        self.city = city.map(item=>{
          return {
            value: item.id,
            label: item.name
          }
        })
      }
      self.cvalue = ''
    }
  },
  methods: {
    remoteMethod: _.debounce(async function (query) {
      const self = this
      if (self.cities.length) {
        self.loading = false
        self.list = self.cities.filter(item => {
          return item.value.indexOf(query) > -1
        })
      }else{
        let {status, data:{city}} = await self.$axios.get('/geo/city')
        if(status===200){
          self.loading = false
          self.cities = city.map(item=>{
            return {
              value: item.name
            }
          })
          self.list = self.cities.filter(item => {
            return item.value.indexOf(query) > -1
          })
        }else{
          self.loading = true
          return []
        }
      }
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/css/changeCity/iselect.scss';
</style>
