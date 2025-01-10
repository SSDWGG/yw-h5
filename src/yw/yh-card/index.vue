<template>
  <view class="container">

    <view class="block">

      <view class="item">
        <view class="lable">
          持卡人
        </view>
        <view class="content">
          <u-input v-model="form.cardHolderName" placeholder="请输入您的姓名" />

        </view>
      </view>
      <view class="item">
        <view class="lable">
          银行
        </view>
        <view class="content">
          <u-input v-model="form.bankName" placeholder="请输入银行名称" />

          <!-- <view class="chooseYh" @click="show = true">
           {{ !!form.yhName?form.yhName:'请选择银行'}} 
          </view> -->
          <!-- <u-picker :show="show" :columns="columns" @confirm="handleConfirmPicker"
            @cancel="handleCalcelPicker"></u-picker> -->
        </view>
      </view>

      <!-- <view class="item">
        <view class="lable">
          银行行号
        </view>
        <view class="content">
          <u-input v-model="form.bankNumber" placeholder="请输入银行行号" /> -->

          <!-- <view class="chooseYh" @click="show = true">
           {{ !!form.yhName?form.yhName:'请选择银行'}} 
          </view> -->
          <!-- <u-picker :show="show" :columns="columns" @confirm="handleConfirmPicker"
            @cancel="handleCalcelPicker"></u-picker> -->
        <!-- </view>
      </view> -->

      <view class="item">
        <view class="lable">
          支行名称
        </view>
        <view class="content">
          <u-input v-model="form.branchName" placeholder="请输入支行名称" />

        </view>
      </view>
      <view class="item last">
        <view class="lable">
          卡号
        </view>
        <view class="content">
          <u-input v-model="form.cardNumber" placeholder="请输入卡号" />

        </view>
      </view>
    </view>

    <view class="add-footer">
      <view class="btn" @click="handleSave">保存</view>
    </view>

  </view>
</template>

<script>
import { addUserBank, getBankList } from '@/api/info'

export default {

  data() {
    return {
      form: {
        cardHolderName: '',
        bankName: '',
        bankNumber: '',
        branchName: '',
        cardNumber: '',
      },
      show: false,
      columns: [
        []
      ],
      userBackList: []
    };
  },
  created() {
    getBankList().then((res) => {
      this.userBackList = res.data
      // this.form = this.userBackList[0]
      // console.log(this.userBackList);
    })


  },

  methods: {
    handleSave() {
      addUserBank(this.form).then(res => {
        uni.showToast({
          title: '绑定成功',
          icon: 'none'
        })
        uni.switchTab({
          url: '/yw/me/index',
        });
      })
    },
    handleConfirmPicker(chooseVal) {
      this.form.yhName = chooseVal.value[0]
      this.handleCalcelPicker()
    },
    handleCalcelPicker() {
      this.show = false
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

      .content {

        .chooseYh {
          border: 1px solid #dadbde;
          border-radius: 4px;
          padding: 10px 9px;
          font-size: 14px;
          color: #F54927;
          font-weight: 500;
        }
      }
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
