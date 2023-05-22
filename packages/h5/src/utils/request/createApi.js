import axios from 'axios'
import { showToast } from 'vant'
import { getErrMsg, getErrStatus, successCode } from './tools/index'
import useLoading from './tools/loading'

function noop() {}
function login() {}

const loading = useLoading()

export default ({
  toast = showToast, // 提示方法
  setHeaders = noop, // 动态设置headers
  handleError = noop, // 自定义错误处理
  loginForce = noop, // 返回401登录后再次尝试
  createOptions = {}, // axios默认设置
  maxCount = 1,
}) => {
  const instence = axios.create(createOptions)
  instence.interceptors.request.use((config) => {
    const headers = setHeaders(config)
    Object.assign(config.headers || {}, headers)
    return config
  })
  return async (requestOptions, { shouldToast = true, shouldLogin = false, shouldLoading = false } = {}) => {
    if (shouldLogin)
      await login()
    // 是否loadding
    for (let i = 0; i < maxCount; i++) {
      try {
        if (shouldLoading)
          loading.show()
        const response = await instence(requestOptions)
        const { resultCode: code, result: data, resultMessage: msg } = response.data
        if (shouldLoading)
          loading.hide()
        // success code
        if (successCode.includes(code))
          return data
        // 重新登录
        if (code === 401 || code === 419)
          login()
        // 报错提醒
        if (shouldToast)
          toast(msg)
        return Promise.reject(msg)
      }
      catch (e) {
        if (shouldLoading)
          loading.hide()
        const status = getErrStatus(e)
        if (i < maxCount && maxCount > 1) {
          // 401重新登录
          if (status === 401 && loginForce) {
            await loginForce()
            continue
          }
          if (e.message.includes('timeout of')) {
            toast('网络异常')
            continue
          }
        }
        // 自定义错误处理
        if (status)
          toast.error(`${status} ${getErrMsg(e)}`)
        handleError(e)
        return Promise.reject(e)
      }
    }
  }
}
