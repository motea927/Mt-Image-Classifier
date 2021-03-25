import { createRouter, createWebHistory } from 'vue-router'
import Classifier from '/@/views/Classifier.vue'

const routes = [
  {
    path: '/',
    redirect: '/Classifier'
  },
  {
    path: '/Classifier',
    component: Classifier
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
