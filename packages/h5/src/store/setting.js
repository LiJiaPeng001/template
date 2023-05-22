import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  const barScrollTop = []
  const keepRoutes = []
  return {
    barScrollTop,
    keepRoutes,
  }
})
