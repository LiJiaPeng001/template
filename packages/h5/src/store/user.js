import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    id: 1,
    name: '李家朋',
    token: 'abcdefg',
  })
  return { user }
})
