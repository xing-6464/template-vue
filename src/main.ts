import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import './promission'

import '@/styles/index.scss'
import installIcons from '@/icons'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import installDirective from '@/directives/index'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

installIcons(app)
installDirective(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
