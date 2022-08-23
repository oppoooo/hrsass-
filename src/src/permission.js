import router, { asyncRoutes } from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  if (token) {
    if (!store.state.user.userInfo.userId) {
      // 获取用户信息store.dispath的返回值是promise
      const { roles } = await store.dispatch('user/getUserInfo')
      console.log(roles)
      await store.dispatch('permission/filterRoutes', roles)
      next(to.path)
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      next()
    } else {
      next('/login')
    }
  }
})
