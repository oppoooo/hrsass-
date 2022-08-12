import PageTools from '@/components/PageTools'
console.log(PageTools)
const components = [PageTools]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
