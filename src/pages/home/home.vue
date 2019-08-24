<template>
  <div>home</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    console.log('router', this.$router)
    console.log('store', this.$store)
  }
}
</script>

<style lang="scss" scoped>
div {
  color: red;
}
</style>
