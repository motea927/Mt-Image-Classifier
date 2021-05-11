<template>
  <TheHeader />
  <router-view></router-view>
  <BaseLoading :show="showLoading" />
</template>

<script>
import TheHeader from '/@/components/common/TheHeader.vue'
import BaseLoading from '/@/components/common/BaseLoading.vue'
import { ref, provide } from 'vue'

export default {
  components: { TheHeader, BaseLoading },
  setup() {
    const showLoading = ref(false)
    const loadingText = ref('')
    provide('showLoading', showLoading)
    provide('loadingText', loadingText)
    return { showLoading }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
