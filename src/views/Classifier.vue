<template>
  <div>
    <div class="flex items-center justify-center bg-grey-lighter mt-24">
      <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-primary rounded-lg shadow-lg tracking-wide uppercase border border-primary cursor-pointer hover:bg-primary hover:text-white">
          <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span class="mt-2 text-base leading-normal">上傳圖片</span>
          <input type='file' class="hidden" accept="image/*" @change="uploadImg" />
      </label>
    </div>
    <ClassifierResult :img="img" :resultLists="resultLists"/>
  </div>
</template>
<script>
import useMl5 from '/@/componsable/useMl5'
import ClassifierResult from '/@/components/Classifier/ClassifierResult.vue'
import { ref, provide } from 'vue'

export default {
  components: { ClassifierResult },
  setup () {
    const img = ref('')
    const { classifier } = useMl5()
    const resultLists = ref([
      {
        label: '請上傳圖片',
        confidence: 1
      }
    ])

    const predict = (img) => {
      const imageObj = new Image()
      imageObj.onload = () => {
        classifier.predict(imageObj, (err, results) => {
          resultLists.value = results
            .sort((a, b) => b.confidence - a.confidence)
        })
      }
      imageObj.src = img
    }

    const uploadImg = (e) => {
      const file = e.target.files[0]
      img.value = URL.createObjectURL(file)
      predict(img.value)
    }

    return { img, resultLists, uploadImg }
  }
}
</script>
<style>
  
</style>
