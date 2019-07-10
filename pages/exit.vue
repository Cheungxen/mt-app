<template>
  
</template>

<script>
export default {
  layot: 'blank',
  middleware: async (ctx)=>{
    let {status, data} = await ctx.$axios.get('/users/exit')
    if (status===200&&data.code===0) {
      window.location.href = '/'
    }
  }
}
</script>

<style>

</style>
