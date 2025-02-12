<template>
  <view class="container">
    <view class="bgcolor" />
    <img class="titleBg" src="@/static/yw/loginBg.png">
    <view class="card-box">
      <card class="card" :isShadow="true">
        <u--form labelPosition="left" labelWidth="0" :model="form" :rules="rules" ref="uForm">
          <u-form-item>
            <text class="login-title">
              <span class="name">用户登陆</span>
            </text>
          </u-form-item>
          <u-form-item prop="username">
            <!-- padding:12px; -->
            <u--input v-model="form.username" style="border: 1px solid #CAA156;border-radius: 10px;padding: 8px 9px;"
              prefixIcon="account" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;"
              placeholder="请输入用户名"></u--input>
          </u-form-item>
          <u-form-item prop="password">
            <u--input v-model="form.password" style="border: 1px solid #CAA156;border-radius: 10px;padding: 8px 9px;"
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
          <u-form-item prop="phone">
            <u--input v-model="form.phone" style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;"
              prefixIcon="phone-fill" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;"
              placeholder="请输入手机号">

            </u--input>
          </u-form-item>
          <!-- <u-form-item prop="code">
            <u--input v-model="form.code" style="padding: 8px 9px;border: 1px solid #CAA156;border-radius: 10px;"
              prefixIcon="fingerprint" prefixIconStyle="color: rgba(70, 41, 6,.7);margin-right:2px;"
              placeholder="请输入验证码">
            
            </u--input>
            <u-button class="code" customStyle="border: none;" :disabled="canSendTime > 0" @click="sendSms" :text="canSendTime > 0 ? `重发${canSendTime}秒` : '发送验证码'
              "></u-button>
          </u-form-item> -->
          <u-form-item style="margin-top:18px">
            <view class="footer" hover-class="none">
              <u-button customStyle="border-radius: 6px;" color="#EF432A" text="登 陆" class="btn"
                @click="handleLogin"></u-button>
              <view class="footerBtns">
                <view class="btn1" hover-class="none">
                  <u-checkbox-group>
                    <u-checkbox checked size="14" labelSize="12" shape="circle" label="保存密码"
                      activeColor="#EF432A"></u-checkbox>
                  </u-checkbox-group>
                </view>
                <view class="btn2" hover-class="none" @click="toRegister2">
                  忘记密码
                </view>
              </view>
            </view>
          </u-form-item>
        </u--form>
      </card>
      <view class="bottomTip" @click="toRegister">
        <view class="tip">
          还没有账号，去注册
        </view>

        <u-icon name="arrow-right" color="rgba(70, 41, 6, 0.4)" size="10">
          ></u-icon>
      </view>
    </view>
  </view>
</template>
<script>
import Card from '@/components/Card.vue'
import { getSysCode, appLogin } from '@/api/login'
export default {
  components: {
    Card
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        phone: '',
        code: ''
      },
      isShowPassword: true,
      jzPassWord: [],
      canSendTime: 0,
      intervalTimer: null,
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
    toRegister() {
      uni.navigateTo({ url: '/yw/register/index' })
    },
    toRegister2() {
      uni.navigateTo({ url: '/yw/register/index?reset=true' })
    },
    handleLogin() {

      this.$refs.uForm.validate().then(async () => {
        appLogin(this.form).then((res) => {
          this.$store.dispatch('user/setAccessToken', res.data.access_token)
          uni.$u.toast('登录成功')
          uni.switchTab({ url: '/yw/menu/index' })
        })
          .catch(errors => {
            uni.$u.toast(errors)
          })


      })


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