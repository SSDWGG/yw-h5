<template>
  <view class="container">
    <u-subsection :list="list" keyName="name" :current="current" @change="sectionChange"></u-subsection>
    <view class="card">
      <Card :isShadow="true">
        <view class="flex-between">
          <view class="title">xxx任务</view>
          <view class="ckxq">查看详情</view>
        </view>
        <view style="margin-top:20rpx"><text class="font-blod">任务名称：</text>下大萨达</view>
        <view><text class="font-blod">人员：</text>张三</view>
        <view><text class="font-blod">时间：</text>2023-09-05</view>
        <view><text class="font-blod">任务内容：</text>xxx未签到</view>
      </Card>
    </view>
  </view>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  components: {
    Card
  },
  data(){
    return {
      list:[
        {name:'已反馈'},
        {name:'未反馈'}
      ],
      current: 1,
    }
  },
  methods:{
    sectionChange(index){
      this.current = index;
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx 30rpx 0 30rpx;
  position: relative;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
  margin-top: 20rpx;
  .title {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 30rpx;
    padding-left: 14rpx;
    border-left: 10rpx solid #3c9cff;
  }
  .ckxq {
    color: #3c9cff;
    cursor: pointer;
    font-size: 30rpx;
  }
  .font-blod {
    font-weight: 600;
    font-size: 30rpx;
  }
}
</style>