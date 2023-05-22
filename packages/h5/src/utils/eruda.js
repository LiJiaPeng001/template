import eruda from 'eruda'
import { isDev } from './validate'

if (isDev) {
  const el = document.createElement('div')
  document.body.appendChild(el)

  eruda.init({
    container: el,
    tool: ['console', 'elements', 'network'],
  })
}
