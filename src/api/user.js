import request from '@/utils/request'

/**
 * 提交登录
 * @param {Object} data
 * @returns promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data,
  })
}

/**
 * 获取用户基本信息
 * @returns
 */
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST',
  })
}
/**
 * 根据用户id获取员工详情数据
 * @param {String} id 用户id
 * @returns 
 */
export function getUserDetail(id) {
  return request({
    url: `/sys/user/${id}`,
  })
}
