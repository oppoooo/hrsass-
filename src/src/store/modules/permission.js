import router, { constantRoutes, asyncRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    routes: [], //自己维护的路由规则
    points: []
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, payload) {
      state.points = payload
    }
  },
  actions: {
    filterRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        // console.log(item)
        // r如果权限标识在roles.menus 有这个权限返回true
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRoutes', routes)
      context.commit('setPoints', roles.points)
      // 动态添加路由

      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    }
  }
}
