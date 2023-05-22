import { Loading } from 'vant'
import { createApp } from 'vue'
import './loading.less'

let app

export default function useLoading() {
  const LoadingCtrl = defineComponent({
    setup() {
      const visible = ref(false)
      const tip = ref('')
      return {
        visible,
        tip,
      }
    },
    render() {
      return this.visible && h('div', { class: 'loading-ctrl' }, [h(Loading, { type: 'circle', description: this.tip })])
    },
  })
  if (!app) {
    const instence = document.createElement('div')
    document.body.append(instence)
    app = createApp(LoadingCtrl).mount(instence)
  }
  return {
    num: 0,
    show(tip = '') {
      this.num += 1
      if (this.num === 1) {
        app.visible = true
        app.tip = tip
      }
    },
    hide(force = false) {
      if (force) {
        this.num = 0
        app.visible = false
        return
      }
      // 等待发出去的请求返回结果后结束loading
      if (this.num > 0)
        this.num -= 1
      if (this.num === 0)
        app.visible = false
    },
  }
}
