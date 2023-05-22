/**
 * @param {Function} - toLoadMore 底部触发事件
 * @param {Function} - actionFn   滚动触发事件
 * @param {Number} - time 节流时间间隔
 * @param {Element} ele 滚动Element 默认body
 */
function noop() {}

class MoreMain {
  constructor(props) {
    this.moreOptions = props
    if (!this.moreOptions.ele) this.moreOptions.ele = window
    this.loadMoreFn = noop
  }

  // 获取三围
  getElementClientRect(el) {
    const ele = el || document.documentElement || document.body
    return {
      clientHeight: ele.clientHeight,
      scrollTop: ele.scrollTop,
      scrollHeight: ele.scrollHeight,
    }
  }

  // 开启监听
  mounted() {
    this.moreOptions.ele.addEventListener('scroll', this.loadMoreFn, {
      passive: false,
    })
  }

  // 取消监听
  destroy() {
    const ele = this.moreOptions.ele
    if (this.loadMoreFn) {
      ele.removeEventListener('scroll', this.loadMoreFn)
      this.loadMoreFn = noop
    }
  }
}

class LoadMore extends MoreMain {
  constructor(props) {
    super(props)
    const { time = 100, toLoadMore = noop, actionFn = noop } = props
    this.loadMoreFn = useThrottleFn(() => {
      const { scrollTop, clientHeight, scrollHeight } = this.getElementClientRect()
      actionFn(scrollTop)
      if (scrollTop + clientHeight >= scrollHeight - 80) toLoadMore()
    }, time)
  }
}

export default function useLoadMore(props) {
  const loadmore = new LoadMore(props)
  onMounted(() => {
    loadmore.mounted()
  })
  onUnmounted(() => {
    loadmore.destroy()
  })
}
