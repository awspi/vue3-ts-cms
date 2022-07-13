import { useStore } from '@/store'

export function usePermission(pageName: string, handlerName: string) {
  const store = useStore()
  const permission = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handlerName}`
  return !!permission.find((item) => item === verifyPermission) //转为boolean
}
