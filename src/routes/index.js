import { createRouter, createWebHistory } from 'vue-router'
import Scan from '@/pages/Index.vue'
import PageNotFound from '@/pages/PageNotFound.vue'
const routes = [
  {
    path: '/',
    name: 'scan',
    component: Scan,
    meta: {
      title: 'Scan Member',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound,
    meta: {
      title: '404 Not Found',
    },
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
})
export default router
