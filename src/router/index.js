import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import FacemaskDetection from '../components/FacemaskDetection.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/facemask-detection',
    name: 'FacemaskDetection',
    component: FacemaskDetection
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
