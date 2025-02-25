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
    url: '/system/storeCart/app/list' ,
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
export function deleteToCar(storeCartIds) {
  return request({
    url: '/system/storeCart/'+storeCartIds,
    method: 'delete'
  })
}
export function editToCar(data) {
  return request({
    url: '/system/storeOrderCartInfo' ,
    method: 'put',
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

// 订单
export function createOrder(data) {
  return request({
    url: '/app/storeOrder/createOrder' ,
    method: 'POST',
    data
  })
}
export function getOrderList(params) {
  return request({
    url: '/app/storeOrder/app/list' ,
    method: 'get',
    params
  })
}
// 获取二维码
export function getQR() {
  return request({
    url: '/app/user/spreadQr' ,
    method: 'get'
  })
}
// 获取分销中心数据
export function getBrokerageCenter() {
  return request({
    url: '/app/user/brokerageCenter' ,
    method: 'get'
  })
}
// 获取收益数据
export function getAppIncome() {
  return request({
    url: '/system/userBill/appIncome' ,
    method: 'get'
  })
}
// 获取提现数据
export function getAppExtract() {
  return request({
    url: '/system/userExtract/appExtract' ,
    method: 'get'
  })
}
// 留言
export function postLY(data) {
  return request({
    url: '/system/userLeave' ,
    method: 'post',
    data
  })
}
export function getTeamData() {
  return request({
    url: '/app/user/teamData' ,
    method: 'get'
  })
}
export function takeOrder(data) {
  return request({
    url: '/app/storeOrder/takeOrder' ,
    method: 'post',
    data
  })
}
export function payOrder(storeOrderId) {
  return request({
    url: '/app/storeOrder/payOrder/'+storeOrderId ,
    method: 'post'
  })
}
export function jsapiPayOrder(storeOrderId) {
  return request({
    url: '/app/storeOrder/jsapiPayOrder/'+storeOrderId ,
    method: 'post'
  })
}
export function orderDetail(storeOrderId) {
  return request({
    url: '/app/storeOrder/app/detail',
    method: 'get',
    params:{
      storeOrderId
    }
  })
}
