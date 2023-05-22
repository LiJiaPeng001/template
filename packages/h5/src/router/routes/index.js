import { isDev } from '@/utils/validate'

const files = import.meta.glob('./*.js', { eager: true })

const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/index/index.vue'),
  },
]

if (isDev) {
  routes.push({
    path: '/test',
    name: 'Test',
    meta: {
      title: 'Debugger',
    },
    component: () => import('@/views/test/index.vue'),
  })
}

for (const key in files) {
  const route = files[key].default
  if (Array.isArray(route)) routes.push(...route)
  else routes.push(route)
}

routes.push({
  path: '/:pathMatch(.*)*',
  redirect: { name: 'index' },
})

export default routes
