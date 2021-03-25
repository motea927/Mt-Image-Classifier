import { inject } from 'vue'
import ml5 from 'ml5'

const useMl5 = () => {
  const showLoading = inject('showLoading')
  showLoading.value = true
  const ready = () => {
    showLoading.value = false
  }
  const classifier = ml5.imageClassifier('MobileNet', ready)
  return { classifier }
}

export default useMl5
