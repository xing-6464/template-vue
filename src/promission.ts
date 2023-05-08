import router from '@/router'
import { useUserStore } from './stores/users'

// 白名单
const whiteList = ['/login']

/*
 * 路由前置守卫
 */
router.beforeEach(async (to, form, next) => {
  const { token, hasUserInfo, getUserInfo } = useUserStore()
  if (token) {
    // 用户已登录，则不允许进入login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在
      if (hasUserInfo) {
        await getUserInfo()
      }
      next()
    }
  } else {
    // 用户未登录，只允许进入login
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
