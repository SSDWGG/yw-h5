import request from '@/utils/request'

export function getUserByid(id) {
  return request({
    url: '/prod-api/drug-user/' + id,
    method: 'get'
  })
}
export function getReportByid(id) {
  return request({
    url: '/prod-api/report/' + id,
    method: 'get'
  })
}
// 查看任务详情
export function getTaskByid(id) {
  return request({
    url: '/prod-api/task/' + id,
    method: 'get'
  })
}
// 查看本周积分
export function getWeekPoint(id) {
  return request({
    url: '/prod-api/drug-user/point/week/' + id,
    method: 'get'
  })
}
// 家属根据userid查询
export function getFamilyUserbByid(id) {
  return request({
    url: '/prod-api/family-user/' + id,
    method: 'get'
  })
}

// 删除任务
export function deleteTask(id) {
  return request({
    url: '/prod-api/task/' + id,
    method:'delete'
  })
}

// 签到
export function getQd(params) {
  return request({
    url: '/prod-api/sign',
    method:'post',
    params
  })
}

// 查询签到
export function queryQd() {
  return request({
    url: '/prod-api/sign',
    method:'get',
    
  })
}
