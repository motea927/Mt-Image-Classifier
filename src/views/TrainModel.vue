<template lang="">
  <div class="container mx-auto px-5 text-center">
    <BaseUploadBtn @upload="uploadImg" :multiple-file="true" class="mt-10" />
    <template v-if="fileLists.length">
      <BaseFileTable
        :file-lists="fileLists"
        @deleteImg="deleteImg"
        class="mt-10"
      />
      <button
        class="bg-primary border border-primary px-4 py-6 rounded text-white cursor-pointer hover:bg-white hover:text-primary shadow-lg my-10 mx-2"
        @click="train"
      >
        開始訓練
      </button>

      <button
        v-if="showSaveBtn"
        class="bg-primary border border-primary px-4 py-6 rounded text-white cursor-pointer hover:bg-white hover:text-primary shadow-lg my-10 mx-2"
        @click="saveModel"
      >
        保存模型
      </button>
    </template>
  </div>
</template>

<script>
import BaseUploadBtn from '/@/components/common/BaseUploadBtn.vue'
import BaseFileTable from '/@/components/common/BaseFileTable.vue'
import useMl5 from '/@/componsable/useMl5'
import { ref, inject } from 'vue'

export default {
  components: { BaseUploadBtn, BaseFileTable },
  setup () {
    const { trainableClassifier } = useMl5()
    let classifier
    const fileLists = ref([])
    const showLoading = inject('showLoading')
    const loadingText = inject('loadingText')

    const showSaveBtn = ref(false)
    const uploadImg = (paramsFileLists) => {
      showSaveBtn.value = false
      fileLists.value = paramsFileLists
    }

    const deleteImg = (fileName) => {
      fileLists.value = fileLists.value
        .filter(file => file.name !== fileName)
    }

    
    const addImageToClassifier = (file) => {
      return new Promise(resolve => {
        const label = file.name.split('_')[0]
        const imageSrc = URL.createObjectURL(file)
        const imageObj = new Image()
        imageObj.onload = () => {
          classifier
            .addImage(imageObj, label)
            .then(() => resolve())
        }
        imageObj.src = imageSrc
      })
    }

    const train = async () => {
      const labelLists = [...new Set(
        fileLists.value
          .map(file => file.name.split('_')[0])
      )]
      classifier = await trainableClassifier(labelLists.length)

      // Prepare image label & Add to classifier
      
      showLoading.value = true
      loadingText.value = `讀取圖片中...`

      await Promise.all(
        fileLists.value
          .map(async (file) => addImageToClassifier(file))
      )

      // Training
      classifier.train((loss) => {
        loadingText.value = `訓練中, loss: ${loss}`
        if (!loss) {
          showSaveBtn.value = true
          showLoading.value = false
        }
      })
    }

    const saveModel = () => classifier.save()

    return { uploadImg, fileLists, deleteImg, train, showSaveBtn, saveModel }
  }
}
</script>
<style lang="">
  
</style>
