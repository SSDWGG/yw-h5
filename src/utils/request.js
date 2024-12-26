import axios from "axios";
import qs from "qs";
import axiosAdapterUniapp from "axios-adapter-uniapp";
import store from "@/store";
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
  baseURL: "https://ywmall.ssdwgg.cn", // 正式地址
  // baseURL: 'http://5dy6mu.natappfree.cc/', // 测试
  timeout: 60 * 1000,
  adapter: axiosAdapterUniapp,
});
Instance.interceptors.request.use(
  (config) => {
    // 如果已登录 则获取token
    const token = uni.getStorageSync("access_token");
    // let token = uni.getStorageSync('token')
    config.headers["Authorization"] = "Bearer " + token;
    if (config.method === "post") {
      // if (config.contentType === 'json') {
      config.headers["Content-Type"] = "application/json;";
      // } else {
      //     config.data = qs.stringify(config.data)
      //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      // }
    } else if (config.method === "get") {
      config.params = {
        ...config.params,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
Instance.interceptors.response.use(
  (response) => {
    const { code, msg } = response.data;

    if (code === 200) {
      return Promise.resolve(response.data);
    } else if (code === 500) {
      uni.$u.toast(msg);
      // uni.showToast({
      //   title: msg,
      //   icon: 'error'
      // })
      return Promise.reject(msg);
    } else if (code === 401) {
      store.dispatch("user/loginOut");
      return Promise.reject(msg);
    } else {
      return Promise.reject(msg);
    }
  },
  (error) => {
    if (error.message !== "cancel http") {
      console.log("服务异常，请稍后再试");
    }
    return Promise.reject(error);
  }
);

export default Instance;
