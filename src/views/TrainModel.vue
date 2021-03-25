<template lang="">
  <div class="container mx-auto px-5 text-center">
    <BaseUploadBtn @upload="uploadImg" :multipleFile="true" class="mt-10" />
    <template v-if="fileLists.length">
      <BaseFileTable
        :fileLists="fileLists"
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
import { ref } from 'vue'

export default {
  components: { BaseUploadBtn, BaseFileTable },
  setup () {
    const { trainableClassifier } = useMl5()
    const classifier = trainableClassifier()
    const fileLists = ref([])

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
      return new Promise((resolve, reject) => {
        const label = file.name.split('_')[0]
        const imageSrc = URL.createObjectURL(file)
        const imageObj = new Image()
        imageObj.onload = () => {
          classifier.addImage(imageObj, label)
          resolve()
        }
        imageObj.src = imageSrc
      })
    }

    const train = async () => {
      // Prepare image label & Add to classifier
      await Promise.all(fileLists.value.map(async (file) => addImageToClassifier(file)))

      // Training
      classifier.train((loss) => {
        if (!loss) showSaveBtn.value = true
      })
    }

    const saveModel = () => classifier.save()

    return { uploadImg, fileLists, deleteImg, train, showSaveBtn, saveModel }
  }
}
</script>
<style lang="">
  
</style>
