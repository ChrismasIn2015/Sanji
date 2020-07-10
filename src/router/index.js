import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('../views/library/library.vue'),
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/history/history.vue'),
  },
  {
    path: '/uiBoard',
    name: 'uiBoard',
    component: () => import('../views/uiBoard/uiBoard.vue'),
  },
  {
    path: '/colorBoard',
    name: 'colorBoard',
    component: () => import('../views/colorBoard/colorBoard.vue'),
  },
  {
    path: '/stockBoard',
    name: 'stockBoard',
    component: () => import('../views/stockBoard/stockBoard.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
