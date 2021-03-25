<template>
  <div>
    <BaseUploadBtn @upload="uploadImg" :multipleFile="false" class="mt-10" />
    <ClassifierResult :img="img" :resultLists="resultLists"/>
  </div>
</template>

<script>
import useMl5 from '/@/componsable/useMl5'
import BaseUploadBtn from '/@/components/common/BaseUploadBtn.vue'
import ClassifierResult from '/@/components/Classifier/ClassifierResult.vue'
import { ref, provide } from 'vue'

export default {
  components: { BaseUploadBtn, ClassifierResult },
  setup () {
    const img = ref('')
    const { getDefaultClassifier } = useMl5()
    const classifier = getDefaultClassifier()
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

    const uploadImg = (fileLists) => {
      const file = fileLists[0]
      img.value = URL.createObjectURL(file)
      predict(img.value)
    }

    return { img, resultLists, uploadImg }
  }
}
</script>

<style>
  
</style>
