const files = import.meta.glob('./*/index.vue', { eager: true })
const components = {}

for (const key in files) {
  if (Object.prototype.hasOwnProperty.call(files, key)) {
    const name = key.replace(/(\.\/|\/index.vue)/g, '')
    components[name] = files[key].default
  }
}

export default {
  install(Vue) {
    Object.keys(components).forEach((key) => {
      Vue.component(key, components[key])
    })
  },
}
