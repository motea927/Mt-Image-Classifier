import { createRouter, createWebHistory } from 'vue-router'
import Classifier from '/@/views/Classifier.vue'

const routes = [
  {
    path: '/',
    redirect: '/Classifier/default'
  },
  {
    path: '/Classifier/default',
    name: 'ClassifierDefault',
    component: Classifier
  },
  {
    path: '/Classifier/custom',
    name: 'ClassifierCustom',
    component: Classifier
  },
  {
    path: '/TrainModel',
    name: 'TrainModel',
    component: () => import('/@/views/TrainModel.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
