import request from '@/utils/request'

// 轮播图
export function getBannerList() {
  return request({
    url: '/system/banner/appList' ,
    method: 'get'
  })
}
// 商品列表
export function getProdList(params) {
  return request({
    url: '/system/storeProduct/appList' ,
    method: 'get',
    params
  })
}
// 商品详情
export function getProdItem(storeProductId) {
  return request({
    url: '/system/storeProduct/app/'+storeProductId ,
    method: 'get'
  })
}
// 分类
export function getCategoryAll() {
  return request({
    url: '/system/storeCategory/getCategoryAll' ,
    method: 'get'
  })
}


// 银行卡
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

// 地址
export function getAddressList() {
  return request({
    url: '/app/userAddress/list' ,
    method: 'get'
  })
}

export function getAddressItem(userAddressId) {
  return request({
    url: '/app/userAddress/'+userAddressId ,
    method: 'get'
  })
}

export function addAddress(data) {
  return request({
    url: '/app/userAddress' ,
    method: 'post',
    data
  })
}
export function editAddress(data) {
  return request({
    url: '/app/userAddress' ,
    method: 'put',
    data
  })
}

export function deleteAddress(userAddressIds) {
  return request({
    url: '/app/userAddress/'+userAddressIds ,
    method: 'delete'
  })
}


// 购物车
export function getCarList() {
  return request({
    url: '/system/storeCart/list' ,
    method: 'get'
  })
}
export function addToCar(data) {
  return request({
    url: '/system/storeCart' ,
    method: 'post',
    data
  })
}

// 用户信息
export function getYwUserInfo() {
  return request({
    url: '/app/user/info' ,
    method: 'get'
  })
}

export function editUserInfo(data) {
  return request({
    url: '/app/user/update' ,
    method: 'put',
    data
  })
}
export function editPwd(data) {
  return request({
    url: '/app/user/updatePwd' ,
    method: 'put',
    data
  })
}