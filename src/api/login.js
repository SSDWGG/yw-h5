import request from '@/utils/request'

export function getSysCode(phonenumber) {
  return request({
    url: '/resource/sms/code' ,
    method: 'get',
    params:{
      phonenumber
    }
  })
}

export function appRegister(data) {
  return request({
    url: '/auth/appRegister' ,
    method: 'post',
    data
  })
}

export function appLogin(data) {
  return request({
    url: '/auth/appLogin' ,
    method: 'post',
    data
  })
}
export function applogout() {
  return request({
    url: '/auth/logout' ,
    method: 'post'
  })
}
export function appResetPwd(data) {
  return request({
    url: '/auth/resetPwd' ,
    method: 'post',
    data
  })
}