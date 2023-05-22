import Qs from 'qs'
import md5 from 'js-md5'
import JSEncrypt from 'jsencrypt'
import { isProd } from '../../validate'

function getEncryptCode(str) {
  const pubKey = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2Z3z3tI5NTk9UAFvhsJnjasan
  aurn6HzZo7uze+Nqt8e9z8MvekTKc/x5vnKPpt78XjAL7/VCdMx3hzOvxHl3o6Ys
  M6LTimt02VMykxydUzgN0AqPlrliFgKa0v3AWX7Qy/IJoeExwkbgKcOZgm5qOyn+
  tz0zLEhH2cG0YlIqcwIDAQAB
  -----END PUBLIC KEY-----`
  const encryptStr = new JSEncrypt({})
  encryptStr.setPublicKey(pubKey) // 设置 加密公钥
  return encryptStr.encrypt(str) // 进行加密
}

function base64encode(str) {
  const base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let out, i
  let c1, c2, c3
  const len = str.length
  i = 0
  out = ''
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xFF
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2)
      out += base64EncodeChars.charAt((c1 & 0x3) << 4)
      out += '=='
      break
    }
    c2 = str.charCodeAt(i++)
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2)
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
      out += base64EncodeChars.charAt((c2 & 0xF) << 2)
      out += '='
      break
    }
    c3 = str.charCodeAt(i++)
    out += base64EncodeChars.charAt(c1 >> 2)
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6))
    out += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return out
}

function utf16to8(str) {
  let out, i, c
  out = ''
  const len = str.length
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if (c >= 0x0001 && c <= 0x007F) {
      out += str.charAt(i)
    }
    else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
    else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}

function sortData(obj) {
  const arr = []
  for (const i in obj)
    arr.push([obj[i], i])

  arr.sort((a, b) => {
    return a[0] - b[0]
  })
  const len = arr.length
  obj = {}
  for (let i = 0; i < len; i++)
    obj[arr[i][1]] = arr[i][0]

  return obj
}

export function getAssignData(data) {
  let browserVer = (navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[/: ]([\d.]+)/) || [0, '0'])[1]
  if (browserVer === '0')
    browserVer = '604.1.38'
  const defaultData = {
    version: '6200',
    app_id: '001',
    charset: 'UTF-8',
    format: 'json',
    // deviceType: isDev ? '0002' : '0003',
    deviceType: '0003',
    deviceID: browserVer,
    date: Math.round(new Date().getTime() / 1000),
  }

  data = sortData(Object.assign(defaultData, data))

  // md5
  const signStr = Object.keys(data)
    .sort()
    .reduce((all, key) => {
      const item = data[key]
      const value = typeof item == 'object' ? JSON.stringify(item) : item
      all += key + value
      return all
    }, '')
  const md5Code = isProd ? '76392801' : '88888888'
  data.sign = md5(md5(signStr).toUpperCase() + md5Code).toUpperCase()

  // base64encode
  let str = Object.keys(data).reduce((all, key) => {
    const item = data[key]
    const value = typeof item == 'object' ? JSON.stringify(item) : item
    all += `${key}=${value}&`
    return all
  }, '')
  str = base64encode(utf16to8(str.substring(0, str.length - 1)))

  // rsa加密，加密部分过长，做分段加密
  const encrytext = []
  for (let i = 0; i < parseInt(`${str.length / 110}`) + 1; i++)
    encrytext[i] = getEncryptCode(str.substring(0 + i * 110, 110 * (i + 1)))

  return Qs.stringify(encrytext)
}
