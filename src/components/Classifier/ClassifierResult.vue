<template>
  <section class="text-gray-600 body-font">
    <div class="container flex flex-wrap px-5 py-10 mx-auto">
      <div class="w-full my-10 overflow-hidden rounded-lg lg:w-1/2 lg:my-auto">
        <img
          alt="feature"
          class="object-contain object-center w-full max-h-full rounded"
          :src="img ? img : 'https://picsum.photos/400'"
        />
      </div>
      <div
        class="flex flex-col flex-wrap w-full -mb-10 text-center  lg:py-6 lg:w-1/2 lg:pl-12 lg:text-left"
      >
        <div
          class="flex flex-col mb-10"
          v-for="(result, index) in resultLists"
          :key="index"
        >
          <div class="flex items-center flex-grow">
            <div
              class="inline-flex items-center justify-center w-12 h-12 mr-5 text-red-500 bg-red-100 rounded-full "
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div>
              <h2 class="px-2 text-lg font-medium text-gray-900">辨識結果</h2>
              <div
                class="flex items-center justify-center divide-x divide-primary"
              >
                <p class="px-2 text-base">種類：{{ result.label }}</p>
                <a class="px-2 text-red-500"
                  >機率： {{ Math.round(result.confidence * 100) }}%</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: '',
    },
    resultLists: {
      type: Array,
      default: () => [
        {
          label: '請上傳圖片',
          confidence: 0.1,
        },
      ],
    },
  },
}
</script>
<style></style>
