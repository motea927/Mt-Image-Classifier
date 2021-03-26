<template>
  <div>
    <BaseUploadBtn @upload="uploadImg" :multiple-file="false" class="mt-10" />
    <ClassifierResult :img="img" :result-lists="resultLists"/>
  </div>
</template>

<script>
import useMl5 from '/@/componsable/useMl5'
import BaseUploadBtn from '/@/components/common/BaseUploadBtn.vue'
import ClassifierResult from '/@/components/Classifier/ClassifierResult.vue'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: { BaseUploadBtn, ClassifierResult },
  setup () {
    const route = useRoute()
    const img = ref('')
    const resultLists = ref([
      {
        label: '請上傳圖片',
        confidence: 1
      }
    ])
    const { getDefaultClassifier, getCustomClassifier } = useMl5()

    let classifier

    watchEffect(async () => {
      img.value = ''
      resultLists.value = [
        {
          label: '請上傳圖片',
          confidence: 1
        }
      ]
      if (route.name === 'ClassifierCustom') {
        classifier = await getCustomClassifier()
        return
      }
      classifier = await getDefaultClassifier()
    })

    const predict = (img) => {
      const imageObj = new Image()
      imageObj.onload = () => {
        classifier.classify(imageObj, (err, results) => {
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
