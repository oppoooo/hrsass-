import request from '@/utils/request'
export function getDeptsApi() {
  return request({
    url: '/company/department',
  })
}
/**
 * 根据id删除
 * @param {String} id
 * @returns
 */
export function delDeptsApi(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE',
  })
}
/**
 * 新增部门
 * @param {String} data
 * @returns
 */
export function addDeptsApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data,
  })
}
/**
 * 根据id获取部门详情
 * @param {*} id 部门id
 * @returns
 */
export function getDeptByIdApi(id) {
  return request({
    url: '/company/department/' + id,
  })
}
/**
 * 根据修改部门详情
 * @param {*} id 部门id
 * @returns
 */
export function editDeptsApi(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data,
  })
}
