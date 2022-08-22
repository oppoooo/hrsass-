import { login, getInfo, getOtherInfo } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router/index'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res)
      setTokenTime()
    },
    async getUserInfo(context) {
      const Info = await getInfo()
      const OtherInfo = await getOtherInfo(Info.userId)
      context.commit('setUserInfo', { ...Info, ...OtherInfo })
      // 通过OtherInfo处理动态路由
      // actions可以通过return将数据传递出去 类似then中的return
      return Info
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      resetRouter()
      context.commit('permission/setRoutes', [], { root: true })
    }
  }
}
