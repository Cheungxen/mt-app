<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>{{name}}<i class="el-icon-arrow-down el-icon--right"/></dt>
      <dd>
        <h3>{{name}}</h3>
        <span v-for="(item,idx) in list" :key="idx">
          {{item}}
        </span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default(){
        return []
      }
    },
    name: {
      type: String,
      default: ''
    }
  }

}
</script>

<style>

</style>
