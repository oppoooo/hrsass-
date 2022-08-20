import request from '@/utils/request'

// 获取角色列表
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}
// 新增角色
export function addRolesApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
/** *
 * 给用户分配角色
 * ***/
export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
