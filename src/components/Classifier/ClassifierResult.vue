<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-10 mx-auto flex flex-wrap">
      <div class="lg:w-1/2 w-full my-10 lg:my-auto rounded-lg overflow-hidden">
        <img alt="feature" class="object-contain object-center max-h-full w-full rounded" :src="img ? img : 'https://picsum.photos/400'">
      </div>
      <div class="flex flex-col flex-wrap lg:py-6 -mb-10 w-full lg:w-1/2 lg:pl-12 lg:text-left text-center">
        <div
          class="flex flex-col mb-10"
          v-for="(result, index) in resultLists"
          :key="index"
        >
          <div class="flex-grow flex items-center">
            <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mr-5">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-gray-900 text-lg font-medium px-2">辨識結果</h2>
              <div class="divide-x divide-primary flex justify-center items-center">
                <p class="text-base px-2">種類：{{ result.label }}</p>
                <a class="text-red-500 px-2">機率： {{ Math.round(result.confidence * 100) }}%</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>  
</template>

<script>
import { ref, inject } from 'vue'

export default {
  props: {
    img: {
      type: String,
      default: ''
    },
    resultLists: {
      type: Array,
      default: [{
        label: '請上傳圖片',
        confidence: 0.1
      }]
    }
  }
}
</script>
<style lang="">
  
</style>
