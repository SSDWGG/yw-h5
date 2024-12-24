import request from '@/utils/request'
import { data } from 'uview-ui/libs/mixin/mixin'

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
    method: 'get',
    data
  })
}