import { createRouter, createWebHashHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHashHistory(),
})

router.beforeEach(async (to, from, next) => {
  next()
})

router.afterEach((route) => {
  // 设置路由title
  const { title = '' } = route.meta || {}
  document.title = title
})

export default router
