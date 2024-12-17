<script>
export default {
  data(){
    return{
     selectTab:1
    }
  },
  onLaunch: function () {
    // let accessToken = uni.getStorageSync('token')
    // let userType = uni.getStorageSync('userType')
    // uni.hideTabBar()
    // if (accessToken) {
    //   // 存在登陆状态 刷新登陆状态
    //   let user_info = uni.getStorageSync('userInfor')
    //   this.$store.dispatch('user/setUserInfo', { user_info, accessToken })
    //   setTimeout(() => {
    //     if(userType == '禁毒中队') {
    //       // uni.setStorageSync('tabBar',tabbar[0])
    //       uni.navigateTo({ url: '/pagesPack2/home/index' })
    //     } else {
    //       // uni.setStorageSync('tabBar',tabbar[1])
    //       uni.switchTab({ url: '/pages/index/index' })
    //     }
    //   },0)
    // }else{
    //   this.$store.dispatch('user/loginOut')
    // }
  },
  onShow: function () {
    uni.hideTabBar()
  },
  onHide: function () {
  },
  methods: {},
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
/*每个页面公共css */
body {
  background: $uni-bg-color;
  color: $uni-text-color;
  font-size: $uni-font-size-base;
}
</style>
