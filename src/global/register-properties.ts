import { App } from 'vue'
import { formatUtcString } from '@/utils/date-format'

// 自定义类型申明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      formatTime(value: string): string
    }
  }
}

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
