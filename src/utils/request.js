import axios from 'axios'
import qs from 'qs'
import axiosAdapterUniapp from 'axios-adapter-uniapp'
import store from '@/store'
/**
 * @description 基于axios的二次封装
 */
const Instance = axios.create({
    // #ifdef  MP-WEIXIN
    // baseURL: 'https://xx7x.star7.cn:8090',
    // baseURL: 'https://gayws.wuchuangroup.com:8443',
    // #endif
    // #ifndef  MP-WEIXIN
    // baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'https://gayws.wuchuangroup.com:8443',
    //   baseURL: process.env.NODE_ENV === 'development' ? '/api': 'http://192.168.40.96:8896',
    // #endif
    baseURL: 'https://gayws.wuchuangroup.com:8443', // 正式地址
    // baseURL: 'http://5dy6mu.natappfree.cc/', // 测试
    timeout: 60 * 1000,
    adapter: axiosAdapterUniapp,
})
Instance.interceptors.request.use(
    (config) => {
        // 如果已登录 则获取token
        if (store.getters.isLogin) {
            let token = store.getters.token
            // let token = uni.getStorageSync('token')
            config.headers['Authorization'] = token
            // token 不存在 则退出登录
            !token && store.dispatch('user/loginOut')
        }

        if (config.method === 'post') {
            if (config.contentType === 'json') {
                config.headers['Content-Type'] = 'application/json;charset=UTF-8'
            } else {
                config.data = qs.stringify(config.data)
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            }
        } else if (config.method === 'get') {
            config.params = {
                ...config.params,
            }
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
const successCode = [200, 'success']
Instance.interceptors.response.use(
    (response) => {
        const { code, message } = response.data
        if(code ===401){
          store.dispatch('user/loginOut')
        }
       else  if (successCode.includes(code) || typeof code !== 'number') {
            return response.data
        } else if (response.responseType == 'blob') {
            return response.data
        } else if (response.code === 403) {
            store.dispatch('user/loginOut')
        }else if (response.code === 401) {
          store.dispatch('user/loginOut')
        }else {
            return Promise.resolve(response.data)
        }
    },
    (error) => {
        if (error.message !== 'cancel http') {
            console.log('服务异常，请稍后再试')
        }
        return Promise.reject(error)
    }
)

export default Instance
