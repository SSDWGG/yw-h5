import request from '@/utils/request'
import { data } from 'uview-ui/libs/mixin/mixin'

export function getBannerList() {
  return request({
    url: '/system/banner/appList' ,
    method: 'get'
  })
}
export function getProdList(params) {
  return request({
    url: '/system/storeProduct/appList' ,
    method: 'get',
    params
  })
}
export function getCategoryAll() {
  return request({
    url: '/system/storeCategory/getCategoryAll' ,
    method: 'get'
  })
}

export function getBankList() {
  return request({
    url: '/app/userBank/list' ,
    method: 'get'
  })
}
export function getUserBank(userBankId) {
  return request({
    url: '/app/userBank/'+userBankId ,
    method: 'get'
  })
}
export function addUserBank(data) {
  return request({
    url: '/app/userBank' ,
    method: 'post',
    data
  })
}
export function editUserBank(data) {
  return request({
    url: '/app/userBank' ,
    method: 'put',
    data
  })
}

export function deleteUserBank(userBankId) {
  return request({
    url: '/app/userBank/'+userBankId ,
    method: 'delete'
  })
}