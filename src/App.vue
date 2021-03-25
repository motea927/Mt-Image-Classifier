<template>
  <TheHeader />
  <router-view></router-view>
</template>

<script>
import TheHeader from '/@/components/common/TheHeader.vue'
export default {
  components: { TheHeader },
  setup (props, ctx) {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
