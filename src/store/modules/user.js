import Service from '@/api'
const state={
    token:'',
    isLogin:false,
    userInfo:{
        id:'',
        username:'',
        nikeName:'',
    },
     qd:'',
     access_token:'',
}

const mutations={
    SET_ACCESS_TOKEN(state, access_token){
        state. access_token =  access_token;
    },
    SET_LOGIN_STATUS(state,status){
        state.isLogin = status;
    },

    SET_TOKEN(state,token){
      state.token = token;
  },
}

const actions = {
    login({ commit }, params) {
        return new Promise((resolve, reject) => {
            Service.login.login(params).then(response => {
                if(response.code == '200'){
                    const data = response
                    commit('SET_TOKEN', data.token)
                    commit('SET_LOGIN_STATUS',true) 
                    uni.setStorageSync('token', data.token)
                    uni.setStorageSync('userType', data.userType)
                    Service.login.getInfo().then( res=>{
                      uni.setStorageSync('userInfor',res.user )
                      resolve(response)
                  })
                }else{
                  uni.showToast({
                    title: response.msg,
                    icon: 'none'
                  })
                }
               
               
            }).catch(error => {
                reject(error)
            })
        })
    },
    setUserInfo({commit},data){
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', data.accessToken)
            commit('SET_LOGIN_STATUS',true) 
            resolve()
        })
    },

    
    loginOut({commit}){
        return new Promise((resolve) => {
            commit('SET_ACCESS_TOKEN', '')
            commit('SET_LOGIN_STATUS','') 
            uni.removeStorageSync('access_token')
            uni.removeStorageSync('isLogin')
            uni.reLaunch({
                url:'/yw/login/index'
            })
            resolve()
        })
    },

    setAccessToken({ commit }, access_token){
      return new Promise((resolve, reject) => {
        commit('SET_ACCESS_TOKEN', access_token)
        commit('SET_LOGIN_STATUS',true) 

        uni.setStorageSync('access_token', access_token)
        uni.setStorageSync('isLogin', true)

        resolve()
    })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
