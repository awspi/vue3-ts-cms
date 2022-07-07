import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCahe from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    //children:[] 根据userMenu决定
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})
router.beforeEach((to) => {
  //如果打开登录页看,可以重新登录
  if (to.path !== '/login') {
    if (!localCahe.getCache('token')) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
