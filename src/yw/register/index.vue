<template>
  <view class="container">
    <view class="bgcolor">

    </view>
    <img class="titleBg" src="@/static/yw/registerBg.png">
    <view class="card-box">
      <card class="card" :isShadow="true">
        <u--form labelPosition="left" labelWidth="0" :model="form" :rules="rules" ref="uForm">
          <u-form-item>
            <text class="login-title">
              <span class="name"> {{ !!this.$mp.query.reset ? '重置密码' : '用户注册' }}</span>
            </text>
          </u-form-item>
          <u-form-item prop="username">
            <!-- padding:12px; -->
            <u--input v-model="form.username" style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;"
              prefixIcon="account" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;"
              placeholder="请输入您的真实姓名"></u--input>
          </u-form-item>
          <u-form-item prop="password">
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
          <u-form-item prop="passwordAganin">
            <u-input v-model="form.passwordAganin"
              style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;" :password="isShowPassword"
              prefixIcon="lock" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;" placeholder="请确认密码">
              <template slot="suffix">
                <u-icon name="eye-fill" color="#E7CD93" size="18" @click="() => {
                  isShowPassword = !isShowPassword
                }">
                  ></u-icon>
              </template>
            </u-input>
          </u-form-item>
          <u-form-item prop="phone">
            <u--input v-model="form.phone" style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;"
              prefixIcon="phone-fill" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;"
              placeholder="请输入手机号">
            </u--input>
          </u-form-item>
          <u-form-item prop="spreadCode">
            <u--input v-model="form.spreadCode" style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;"
              prefixIcon="share" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;"
              placeholder="请输入邀请码，没有则不填">
            </u--input>
          </u-form-item>
          <u-form-item prop="code">
            <u--input v-model="form.code" style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;"
              prefixIcon="fingerprint" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;"
              placeholder="请输入验证码">
              <!-- <template slot="suffix">
                <u-button text="发送验证码"></u-button>
              </template> -->
            </u--input>
            <u-button class="code" customStyle="border: none;" :disabled="canSendTime > 0" @click="sendSms" :text="canSendTime > 0 ? `重发${canSendTime}秒` : '发送验证码'
              "></u-button>
          </u-form-item>
          <u-form-item style="margin-top:20px">
            <view class="footer" hover-class="none">

              <u-button customStyle="border-radius: 6px;" color="#EF432A" :text="!!this.$mp.query.reset ? '重置' : '立即注册'"
                class="btn" @click="handleRegister"></u-button>

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
import { appRegister, appResetPwd, getSysCode } from '@/api/login'

export default {
  components: {
    Card
  },
  data() {
    return {
      jsCode: '',
      form: {
        username: '',
        password: '',
        passwordAganin: '',
        phone: '',
        code: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请填写姓名',
          trigger: ['blur', 'change']
        }, {
          min: 2,
          max: 20,
          message: '长度在2-20个字符之间'
        }
        ],
        password: [{
          required: true,
          message: '请填写密码',
          trigger: ['blur', 'change']
        }, {
          min: 5,
          max: 20,
          message: '长度在5-20个字符之间'
        }
        ],
        passwordAganin: [{
          required: true,
          message: '请填写密码',
          trigger: ['blur', 'change']
        }, {
          min: 5,
          max: 20,
          message: '长度在5-20个字符之间'
        },
        {
          validator: (rule, value, callback) => {
            return value === this.form.password;
          },
          message: '两次输入的密码不一致'
        },
        ],
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: ['change', 'blur'],
        },

        {
          // 自定义验证函数，见上说明
          validator: (rule, value, callback) => {
            // 上面有说，返回true表示校验通过，返回false表示不通过
            // uni.$u.test.mobile()就是返回true或者false的
            return uni.$u.test.mobile(value);
          },
          message: '手机号码不正确',
          // 触发器可以同时用blur和change
          trigger: ['change', 'blur'],
        }
        ],
        code: [{
          type: 'string',
          required: true,
          message: '请填写验证码',
          trigger: ['blur', 'change']
        }],
      },
      canSendTime: 0,
      isShowPassword: true,
      intervalTimer: null,
      jzPassWord: []
    }
  },
  created() {
    console.log(1111, this.$mp.query.spreadCode);
    if (!!this.$mp.query.spreadCode) {
      uni.setStorageSync('spreadCode', this.$mp.query.spreadCode)
      this.form.spreadCode = this.$mp.query.spreadCode
    }else{
      this.form.spreadCode =  uni.getStorageSync('spreadCode')
    }
    this.jsCode = this.getUrlCode();
    // 判断是否在微信浏览器 //  (/micromessenger/.test(navigator.userAgent.toLowerCase()))&&
    if (!this.jsCode && !this.$mp.query.reset) {
      console.log('不存在code，需要换取code用于注册');
      this.getWeChatCode()
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
        getSysCode(this.form.phone)

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
    handleRegister() {

      this.$refs.uForm.validate().then(async () => {

        if (!!this.$mp.query.reset) {
          appResetPwd(this.form).then(() => {
            uni.$u.toast('重置成功')
            setTimeout(() => {
              uni.navigateTo({ url: '/yw/login/index' })
            }, 1000)
          }).catch(errors => {
            uni.$u.toast(errors)
          })
        } else {
          this.form.jsCode = this.jsCode
          appRegister(this.form).then(() => {
            uni.$u.toast('注册成功')
            setTimeout(() => {
              uni.navigateTo({ url: '/yw/login/index' })
            }, 1000)
          }).catch(errors => {
            uni.$u.toast(errors)
          })

        }
      })


    },

    // 获取code 相关  
    // 获取url中的code
    getUrlCode() {
      const url = new URL(location.href);
      const params = new URLSearchParams(url.search);
      const code = params.get('code');
      return code;
    },
    //请求微信接口，用来获取code
    getWeChatCode() {
      let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址
      // let local = encodeURIComponent('https://jinriyouli.cn');
      let appid = 'wx279666fdf4f01517';

      //通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        appid +
        '&redirect_uri=' +
        local +
        '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
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