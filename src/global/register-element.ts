import { App } from 'vue'
// import 'element-plus/theme-chalk/base.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default function (app: App) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
