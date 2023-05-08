import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App } from 'vue'

export default (app: App<Element>) => {
  app.component('svg-icon', SvgIcon)
}
