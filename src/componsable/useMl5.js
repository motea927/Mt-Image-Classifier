import { inject } from 'vue'
import ml5 from 'ml5'

const useMl5 = () => {
  const showLoading = inject('showLoading')

  const ready = () => {
    showLoading.value = false
  }

  const getDefaultClassifier = async () => {
    showLoading.value = true
    const classifier = await ml5.imageClassifier('MobileNet')
    ready()
    return classifier
  }

  const getCustomClassifier = async () => {
    showLoading.value = true
    const mobileNetExtractor = await ml5.featureExtractor('MobileNet', { numLabels: 4 }, ready)
    const classifier = await mobileNetExtractor.classification()
    await classifier.load('/@/assets/model/model.json')
    ready()
    return classifier
  }

  const trainableClassifier = async () => {
    showLoading.value = true
    const mobileNetExtractor = await ml5.featureExtractor('MobileNet', { numLabels: 4 })
    const classifier = await mobileNetExtractor.classification()
    ready()
    return classifier
  }

  return { getDefaultClassifier, getCustomClassifier, trainableClassifier }
}

export default useMl5
