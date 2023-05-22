import { env, isDev } from '../validate'
import createApi from './createApi'
import { getAssignData } from './tools/crypto'

/**
 * @desc 项目中单独配置
 */

export default (options, condition) => {
  const { data } = options
  // 加密需求
  options.method = 'post'
  options.data = getAssignData(data)
  options.url = '/api'
  options.baseURL = isDev ? '/' : env.VITE_APP_REQUESTURL
  // 头部设置
  const requestConfig = createApi({
    createOptions: {
      timeout: 40000,
    },
    setHeaders() {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options.headers,
      }
      return headers
    },
  })
  return requestConfig(options, condition)
}
