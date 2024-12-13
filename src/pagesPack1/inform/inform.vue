<template>
  <view class="container">
    <view class="informList"
        v-for="(item, index) in informData"
        :key="index">
      <u-swipe-action
        autoClose:true
      >
        <u-swipe-action-item :options="options1"  @click="del(index)">
          <view class="listItem">
            <view>{{ item.title }}</view>
            <view class="clr"
              >由<text class="ffd">{{ item.publisherName }}</text
              >发布于<text class="ffd">{{ item.createTime }}</text></view
            >
          </view>
        </u-swipe-action-item>
      </u-swipe-action>
    </view>
    
  </view>
</template>
<script>
export default {
  data() {
    return {
      options1: [
        {
          text: "删除",
        },
      ],
      informData: [
        {
          title: "修改个人信息审核已通过",
          ffd: "xxx",
          time: "2023.09.01  15:00",
        },
        {
          title: "xxxxxxxx",
          ffd: "xxx",
          time: "2023.09.01  15:00",
        },
      ],
    };
  },
  onLoad(){
    this.getList()
  },
  methods:{
    del(i){
      this.informData.splice(i,1)
    },
    getList(){
      let params = {
        pageSize: 10,
        pageNum:1
      }
      this.$service.pushTask.getInform(params).then(res =>{
        this.informData = res.data.content || []
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 10rpx 30rpx 0rpx 30rpx;
  background: #f9fafa;
}
.informList {
  width: 690rpx;
  border-radius: 10rpx;
  margin: 28rpx auto;
  .listItem {
    padding: 22rpx 24rpx;
    background: #ffffff;
    border-top-left-radius: 20rpx;
    border-bottom-left-radius: 20rpx;
    border: 2rpx solid gainsboro;
    .clr {
      text-align: right;
      margin-top: 20rpx;
      color: #949494;
      .ffd {
        margin: 0 8rpx;
      }
    }
  }
 
  ::v-deep .u-swipe-action-item__right__button__wrapper{
    color: #f9fafa;
    background: #E51C23 !important;
  }
  ::v-deep .u-swipe-action-item__right__button{
    border-top-right-radius: 16rpx;
    border-bottom-right-radius: 16rpx;
  }
  ::v-deep .u-swipe-action-item__content{
    background: none;
  }
}
</style>