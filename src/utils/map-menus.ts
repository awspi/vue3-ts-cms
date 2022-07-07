import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  //1.先加载所有routes
  const allroutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    //./system/user/user.ts -> /system/user/user
    const route = require('../router/main' + key.split('.')[1])
    allroutes.push(route.default)
  })
  //2.根据菜单获取需要添加的routes
  const recurse = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allroutes.find((route) => {
          if (!firstMenu) {
            firstMenu = menu
          }

          return route.path == menu.url
        })
        if (route) {
          routes.push(route)
        }
      } else {
        recurse(menu.children)
      }
    }
  }
  recurse(userMenus)
  return routes
}

export function pathMapToMenu(userMenus: any[], currentPath: string) {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu: any = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }
