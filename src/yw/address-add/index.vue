<template>
  <view class="container">

    <view class="block">

      <view class="item">
        <view class="lable" >
          收货人
        </view>
        <view class="content" >
          <u-input v-model="form.realName" placeholder="请输入收货人" />

        </view>
      </view>
      <view class="item">
        <view class="lable" >
          手机号码
        </view>
        <view class="content" >
          <u-input v-model="form.phone" placeholder="请输入手机号码" />

        </view>
      </view>
      <view class="item">
        <view class="lable" >
          所在地区
        </view>
        <view class="content" >
          <u-input v-model="form.district" placeholder="请输入所在地区" />

        </view>
      </view>
      <view class="item last">
        <view class="lable" >
          详细地址
        </view>
        <view class="content" >
          <u-textarea v-model="form.detail" placeholder="请输入详细地址" />

        </view>
      </view>
    </view>
    <view class="add-footer">
      <view class="btn" @click="handleSave">保存</view>
      <view class="btn" v-if="!!this.$mp.query.userAddressId" @click="handleDelete">删除</view>
    </view>

  </view>
</template>

<script>
import { addAddress,getAddressItem,editAddress,deleteAddress } from '@/api/info'

export default {

  data() {
    return {
      form: {
        realName: '',
        phone: '',
        province: '省',
        city: '市',
        district: '',
        detail: '',
        postCode: '000000',
        isDefault: '1',
      }
    };
  },
  created() {
    if(!!this.$mp.query.userAddressId){
      getAddressItem(this.$mp.query.userAddressId).then(res => {
        this.form = res.data
    })
    }
   
  },
  methods: {
    handleDelete(){
      

      deleteAddress(this.$mp.query.userAddressId).then(res => {
        uni.showToast({
          title: '删除地址成功',
          icon: 'none'
        })
        uni.navigateTo({ url: '/yw/address/index' })
      })
    },
    handleSave() {
      if(!!this.$mp.query.userAddressId){
        editAddress(this.form).then(res => {
        uni.showToast({
          title: '修改地址成功',
          icon: 'none'
        })
        uni.navigateTo({ url: '/yw/address/index' })
      })
      }else{
        addAddress(this.form).then(res => {
        uni.showToast({
          title: '添加地址成功',
          icon: 'none'
        })
        uni.navigateTo({ url: '/yw/address/index' })
      })
      }
     
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
      margin-bottom: 12px;
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
