import Service from '@/api'
const state={
    token:'',
    isLogin:false,
    userInfo:{
        id:'',
        username:'',
        nikeName:'',
    },
     qd:''
}

const mutations={
    SET_TOKEN(state,token){
        state.token = token;
    },
    SET_LOGIN_STATUS(state,status){
        state.isLogin = status;
    }
}
function getInfor(){
    Service.login.getInfo().then(res=>{
        // console.log(res);
        uni.setStorageSync('userInfor',res.user )
    })
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
            commit('SET_TOKEN', '')
            commit('SET_LOGIN_STATUS','') 
            // uni.clearStorageSync();
            uni.removeStorageSync('token')
            uni.removeStorageSync('userType')
            uni.removeStorageSync('userInfor')
            uni.reLaunch({
                url:'/pages/yw/login/index'
            })
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
