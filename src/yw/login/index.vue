<template>
  <view class="container">
    <view class="title flex_center">
      <img src="@/static/login/logo_icon.png" style="width:180rpx;height:180rpx" alt="">
    </view>
    <view class="text">yw</view>
    <view class="card-box">
      <card class="card" :isShadow="true">
        <u--form labelPosition="left" labelWidth="0" :model="form">
          <u-form-item>
            <text class="login-title">登录</text>
          </u-form-item>
          <u-form-item>
            <u--input v-model="form.username" style="padding:20rpx 28rpx;" prefixIcon="account-fill"
              prefixIconStyle="font-size: 28px;color: #A8B7D6;margin-right:20rpx;" shape="circle" clearable
              placeholder="请输入用户名"></u--input>
          </u-form-item>
          <u-form-item style="margin-top:40rpx">
            <u--input v-model="form.password" style="padding:20rpx 28rpx;" password prefixIcon="lock-fill"
              prefixIconStyle="font-size: 28px;color: #A8B7D6;margin-right:20rpx;" shape="circle" clearable
              placeholder="请输入密码"></u--input>
          </u-form-item>
          <u-form-item style="margin-top:70rpx" @click="handleLogin">
            <u-button type="primary" shape="circle" text="登 录"></u-button>
          </u-form-item>
        </u--form>
      </card>
    </view>
  </view>
</template>
<script>
import Card from '@/components/Card.vue'
export default {
    components: {
        Card
    },
    data () {
        return {
            form: {
                username: '18158131111',
                password: '123456'
            },
        }
    },
    methods: {
        handleLogin () {
            let phone =  /^1[3456789]\d{9}$/
            if (!this.form.username) {
                uni.showToast({
                    title: '用户名不得为空',
                    icon: 'none'
                })
                return
            }
            // else if (!phone.test(this.form.username)) {
            //     uni.showToast({
            //         title: '没有该用户',
            //         icon: 'none'
            //     })
            //     return
            // }
            if (!this.form.password) {
                uni.showToast({
                    title: '密码不得为空',
                    icon: 'none'
                })
                return
            }
            // this.$store.dispatch('user/login', this.form).then(res => {
            //     if (res.code == '200') {
            //         if(res.userType == '禁毒中队') {
            //             // uni.setStorageSync('tabBar',tabbar[0])
            //             uni.navigateTo({ url: '/pagesPack2/home/index' })
            //         } else {
            //             // uni.setStorageSync('tabBar',tabbar[1])
            //             uni.switchTab({ url: '/pages/index/index' })
            //         }
            //     } else {
            //         uni.showToast({
            //             title: res.msg,
            //             icon: 'none'
            //         })
            //     }
            // }).catch((err) => {
            //     // console.log(err)
            //     uni.showToast({
            //         title: err.data,
            //         icon: 'none'
            //     })
            // })
            uni.switchTab({ url: '/yw/menu/index' })

        }
    }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  background: linear-gradient(to bottom, #DDE9F9, #F7F9FC);
  ;
  padding: 30% 30rpx 0 30rpx;
  box-sizing: border-box;

  .title {
    font-size: 50rpx;
    font-weight: 600;
  }

  .text {
    margin-top: 28rpx;
    text-align: center;
    font-size: 40rpx;
    font-weight: bold;
  }

  .card-box {
    margin-top: 20%;
  }

  .login-title {
    font-size: 40rpx;
    font-weight: 600;
  }


}

// ::v-deep .u-input__content__clear{
//       font-size: 50px !important;
//     }
.flex_center {
  display: flex;
  justify-content: center;
}
</style>