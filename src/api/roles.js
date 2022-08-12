import request from '@/utils/request'
/**
 * 
 * 根据角色获取列表
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params,
  })
}
/**
 * 添加角色
 * @param {*} params 
 * @returns 
 */
export function addRolesApi(data) {
    return request({
      url: '/sys/role',
      method: 'POST',
      data,
    })
  }