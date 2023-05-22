import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const { barScrollTop } = useSettingStore()

    if (to.name in barScrollTop) return { top: barScrollTop[to.name] || 0 }

    if (savedPosition) return savedPosition
    else return { top: 0 }
  },
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
