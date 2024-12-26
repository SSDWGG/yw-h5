<template>
  <view class="container">

    <view class="block">

      <!-- <view class="item">
        <view class="lable">
          账号
        </view>
        <view class="content">
          <u-input v-model="form.receiver" placeholder="请输入账号" />
        </view>
      </view> -->
      <view class="item">
        <view class="lable">
          原始密码
        </view>
        <view class="content">
          <u-input v-model="form.oldPassword" :password="isShowPassword" placeholder="请输入原始密码">
            <template slot="suffix">
              <u-icon name="eye-fill" color="#E7CD93" size="18" @click="() => {
                isShowPassword = !isShowPassword
              }">
                ></u-icon>
            </template>
          </u-input>
        </view>
      </view>
      <view class="item">
        <view class="lable">
          新密码
        </view>
        <view class="content">
          <u-input v-model="form.newPassword" :password="isShowPassword" placeholder="请确认密码">
            <template slot="suffix">
              <u-icon name="eye-fill" color="#E7CD93" size="18" @click="() => {
                isShowPassword = !isShowPassword
              }">
                ></u-icon>
            </template>
          </u-input>
        </view>
      </view>

    </view>
    <view class="add-footer">
      <view class="btn" @click = 'edit'>保存</view>
    </view>

  </view>
</template>

<script>
import { editPwd} from '@/api/info'

export default {

  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: ''
      },
      isShowPassword: true,

    };
  },

  methods: {
    edit(){
      editPwd(this.form).then((res)=>{
        this.$store.dispatch('user/loginOut')
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 13px 10px;
  background: #F4F3F2;
  height: 100vh;
  box-sizing: border-box;

  .block {
    padding: 12px 16px;
    background-color: #FFFFFF;
    border-radius: 10px;

    .item {
      margin-bottom: 30px;

      .lable {
        color: #999999;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 12px;
        margin-left: 4px;
      }

      .content {}
    }

    .last {
      margin-bottom: 16px;
    }
  }

  .add-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #F4F3F2;
    width: 100%;
    padding: 10px;
    padding-bottom: calc(40px + env(safe-area-inset-bottom));
    box-sizing: border-box;

    .btn {
      background-color: #EF432A;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 500;

      width: 100%;
      height: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;

    }
  }

}
</style>
