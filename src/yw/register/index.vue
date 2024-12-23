<template>
  <view class="container">
    <view class="bgcolor">

    </view>
    <img class="titleBg" src="@/static/yw/registerBg.png">
    <view class="card-box">
      <card class="card" :isShadow="true">
        <u--form labelPosition="left" labelWidth="0" :model="form">
          <u-form-item>
            <text class="login-title">
              <span class="name">用户注册</span>
            </text>
          </u-form-item>
          <u-form-item>
            <!-- padding:12px; -->
            <u--input v-model="form.username" style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;"
              prefixIcon="account" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;"
              placeholder="请输入您的真实姓名"></u--input>
          </u-form-item>
          <u-form-item>
            <u--input v-model="form.password" style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;"
              :password="isShowPassword" prefixIcon="lock" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;"
              placeholder="请输入密码">
              <template slot="suffix">
                <u-icon name="eye-fill" color="#E7CD93" size="18" @click="() => {
                  isShowPassword = !isShowPassword
                }">
                  ></u-icon>
              </template>
            </u--input>
          </u-form-item>
          <u-form-item>
            <u-input v-model="form.passwordAganin" style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;"
              :password="isShowPassword" prefixIcon="lock" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;"
              placeholder="请确认密码">
              <template slot="suffix">
                <u-icon name="eye-fill" color="#E7CD93" size="18" @click="() => {
                  isShowPassword = !isShowPassword
                }">
                  ></u-icon>
              </template>
            </u-input>
          </u-form-item>
          <u-form-item>
            <u--input v-model="form.phone" style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;"
              prefixIcon="phone-fill" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;" placeholder="请输入手机号">

            </u--input>
          </u-form-item>
          <u-form-item>
            <u--input v-model="form.code" style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;"
              prefixIcon="fingerprint" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;" placeholder="请输入验证码">
              <!-- <template slot="suffix">
                <u-button text="发送验证码"></u-button>
              </template> -->
            </u--input>
            <u-button class="code" customStyle="border: none;" :disabled="canSendTime > 0" @click="sendSms" :text="canSendTime > 0 ? `重发${canSendTime}秒` : '发送验证码'
              "></u-button>
          </u-form-item>
          <u-form-item style="margin-top:20px">
            <view class="footer" hover-class="none">


              <u-button customStyle="border-radius: 6px;" color="#EF432A" text="立即注册" class="btn" @click="handleLogin"></u-button>

            </view>
          </u-form-item>
        </u--form>
      </card>


      <view class="bottomTip" @click="handleToLogin">
        <view class="tip">
          直接登录
        </view>

        <u-icon name="arrow-right" color="rgba(70, 41, 6, 0.4)" size="10">
          ></u-icon>
      </view>
    </view>
  </view>
</template>
<script>
import Card from '@/components/Card.vue'
export default {
  components: {
    Card
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        passwordAganin: '',
        phone: '',
        code: ''
      },
      canSendTime: 0,
      isShowPassword: true,
      intervalTimer: null,
      jzPassWord: []
    }
  },
  methods: {
    sendSms() {
      if (!!this.form.phone) {
        this.canSendTime = 60;
        this.intervalTimer = setInterval(() => {
          if (this.canSendTime > 0) {
            this.canSendTime--;
          } else {
            clearInterval(this.intervalTimer);
          }
        }, 1000)
      } else {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
      }
    },
    handleToLogin() {
      uni.navigateTo({ url: '/yw/login/index' })
    },
    handleLogin() {
      let phone = /^1[3456789]\d{9}$/
      if (!this.form.username) {
        uni.showToast({
          title: '用户名不得为空',
          icon: 'none'
        })
        return
      }
      if (!this.form.password) {
        uni.showToast({
          title: '密码不得为空',
          icon: 'none'
        })
        return
      }

      if (this.form.password !== this.form.passwordAganin) {
        uni.showToast({
          title: '密码不一致',
          icon: 'none'
        })
        return
      }
      uni.switchTab({ url: '/yw/menu/index' })

    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;

  .bgcolor {
    background: #F4F3F2;
    z-index: -2;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }

  .titleBg {
    width: 100vw;
    position: absolute;
    top: -100px;
    left: 0;
    z-index: -1;
  }

  .card-box {
    padding-top: 190px;
    margin: 0 23px;
    z-index: 2;

    .bottomTip {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      color: rgba(70, 41, 6, 0.4);
      margin-top: 28px;
      font-size: 14px;

      .tip {
        margin-right: 8px;
      }
    }
  }

  .login-title {
    font-size: 20px;
    font-weight: 600;
    width: 100%;
    text-align: center;
    color: #CAA156;

    .name {
      border-bottom: #CAA156 2px solid;
    }
  }

  .footer {
    width: 100%;

    .footerBtns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding-top: 16px;

      .btn1 {
        display: flex;
        color: #666666;
      }

      .btn2 {
        color: #BB9F59;
      }
    }
  }

  .code {
    background: #E5C57F;
    color: #fff;
    width: 97px;
    border-radius: 6px;
    height: 40px;
    margin-left: 13px;
  }


}

// ::v-deep .u-input__content__clear{
//       font-size: 50px !important;
//     }</style>