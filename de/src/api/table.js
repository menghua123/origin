/* jshint esversion:6 */
import request from '@/utils/request'
export function getData() {
  return request({
    url: '/vue-element-admin/table',
    method: 'get'
  })
}
