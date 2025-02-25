<template>
  <view class="container">

    <img src="@/static/yw/pay-result/success.png" class="icon" v-if='payStatus === 1' />
    <img src="@/static/yw/pay-result/error.png" class="icon" v-if='payStatus === 0' />

    <view class="title" v-if="payStatus != -1">
      {{ payStatus === 1 ? '支付成功' : '支付失败' }}
    </view>
    <view class="description">
      可以在个人中心“我的订单”查看
    </view>

    <view class="btn1" @click="backOrderList">查看订单</view>
    <view class="btn2" @click="backMenu">返回首页</view>

  </view>
</template>

<script>
import { orderDetail } from '@/api/info'

export default {

  data() {
    return {
      // 0 error  1  success -1 searching
      payStatus: -1
    };
  },
  created() {
    console.log(this.$mp.query.storeOrderId);
    if (!!this.$mp.query.storeOrderId) {
      orderDetail(this.$mp.query.storeOrderId).then(res => {
        this.payStatus = res.data.paid
      })
    }
    // orderDetail('1894276639522295810').then(res => {
    //    this.payStatus = res.data.paid
    //    console.log(this.payStatus);
    // })
  },

  methods: {
    backMenu() {
      uni.switchTab({
        url: '/yw/menu/index',
      });
    },
    backOrderList() {
      uni.navigateTo({ url: '/yw/my-order/index?type=99' })
    }
  },
};
</script>

<style lang="scss" scoped>
.container {

  background: #F4F3F2;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .icon {
    width: 64px;
    height: 64px;
  }

  .title {
    margin-top: 35px;
    color: #222222;
    font-size: 20px;
    font-weight: 500;
  }

  .description {
    margin-top: 12px;
    color: rgba(34, 34, 34, .5);
    font-size: 16px;

  }

  .btn1 {
    margin-top: 117px;
    width: 219px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #EF432A;
    border-radius: 6px;
    font-size: 14px;
  }

  .btn2 {
    margin-top: 18px;
    width: 219px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    background-color: #fff;
    border-radius: 6px;
    font-size: 14px;

  }
}
</style>
