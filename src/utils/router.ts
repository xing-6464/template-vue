import { resolve } from 'path-browserify'
import _ from 'lodash'
import type { RouteRecordRaw } from 'vue-router'

type FormatRoute = RouteRecordRaw & {
  path: string
}

export function generateMenus(routers: readonly RouteRecordRaw[], basePath = '') {
  const result: FormatRoute[] = []

  routers.forEach((item) => {
    if (_.isUndefined(item.children) && _.isUndefined(item.meta)) return

    if (_.isUndefined(item.meta) && !_.isUndefined(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }

    const routerPath = resolve(basePath, item.path)
    let route: any = result.find((item) => item.path === routerPath)
    if (!route) {
      route = {
        ...item,
        path: routerPath,
        children: []
      }
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }

    if (!_.isUndefined(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })

  return result
}
