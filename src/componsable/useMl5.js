import { inject } from 'vue'
import ml5 from 'ml5'

const useMl5 = () => {
  const showLoading = inject('showLoading')
  const loadingText = inject('loadingText')

  const loading = () => {
    loadingText.value = '載入模型中'
    showLoading.value = true
  }

  const ready = () => showLoading.value = false

  const getDefaultClassifier = async () => {
    loading()
    const classifier = await ml5.imageClassifier('MobileNet')
    ready()
    return classifier
  }

  const getCustomClassifier = async () => {
    loading()
    const mobileNetExtractor = await ml5.featureExtractor('MobileNet', { numLabels: 4 }, ready)
    const classifier = await mobileNetExtractor.classification()
    const prefix = import.meta.env.MODE === 'development' ? '/public' : ''
    await classifier.load(`${prefix}/model/model.json`)
    ready()
    return classifier
  }

  const trainableClassifier = async (numLabels) => {
    loading()
    const mobileNetExtractor = await ml5.featureExtractor('MobileNet', { numLabels })
    const classifier = await mobileNetExtractor.classification()
    ready()
    return classifier
  }

  return { getDefaultClassifier, getCustomClassifier, trainableClassifier }
}

export default useMl5
