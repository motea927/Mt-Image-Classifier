import { inject } from 'vue'
import ml5 from 'ml5'

const useMl5 = () => {
  const showLoading = inject('showLoading')
  showLoading.value = true

  const ready = () => {
    showLoading.value = false
  }

  const getDefaultClassifier = () => ml5.imageClassifier('MobileNet', ready)

  const trainableClassifier = () => {
    const mobileNetExtractor = ml5.featureExtractor('MobileNet', ready)
    return mobileNetExtractor.classification()
  }
  return { getDefaultClassifier, trainableClassifier }
}

export default useMl5
