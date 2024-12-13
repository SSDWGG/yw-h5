<template>
  <view class="container">
    <image src="../../static/my/jfbg.png" class="ratingBg"></image>
    <view class="ratingInfo">
      <view class="totRating">
        <text class="total">总积分</text>
        <text class="totalNum">{{pointCount}}</text>
      </view>
      <view>
        <text class="week">本周积分</text>
        <text class="weekNum">{{pointWeek}}</text>
      </view>
    </view>

    <view class="infoList" v-for="(it, index) in listData" :key="index">
      <view class="listCon">
        <view class="pfmc">
          <text>{{ it.content }}</text>
          <!-- <text class="jf">{{ it.rating }}</text> -->
        </view>
        <view class="ffr">
          <text>发放人:</text>
          <text>{{ it.operateName }}</text>
        </view>
        <view class="sj">时间：{{ it.createTime }}</view>
      </view>
    </view>
    <view class="jz" @click="loadingMore">
      <u-loadmore :status="loadStatus" dashed line lineColor="#606266"/>
    </view>
  </view>
</template>
<script>
import {getWeekPoint, getUserByid} from '@/api/montageApi'
export default {
  data() {
    return {
      form:{
        pageNum:1,
        pageSize:10,
        // drugUserid:2
      },
      pointCount: 0,
      pointWeek:0,
      loadStatus:"loadmore",
      listData: [
        // {
        //   title: "在规定时间内完成尿检",
        //   rating: "+2",
        //   issued: "发放人：",
        //   name: "xxx",
        //   time: "2023.9.1  15:06",
        // },
        // {
        //   title: "在规定时间内完成尿检",
        //   rating: "+2",
        //   issued: "发放人：",
        //   name: "xxx",
        //   time: "2023.9.1  15:06",
        // },
      ],
    };
  },
  onLoad(){
    this.getRating()
  },
  methods: {
    goPerson() {
      uni.navigateTo({
        url: "../../pages/personInfo/index",
      });
    },
    getRating(){
      let userInfor = uni.getStorageSync('userInfor')
      let params = {
        ...this.form,
        drugUserid:userInfor.userId
      }
      this.loadStatus = 'loading'
      this.$service.rating.ratingList(params).then(res =>{
        if(res.code == 200) {
          this.listData = res.data.content || []
          if((res.data.number+1)*res.data.size>=res.data.totalElements) {
            this.loadStatus = 'nomore'
          } else {
            this.loadStatus = 'loadmore'
          }
        }
      })
      getWeekPoint(userInfor.userId).then(res=>{
        this.pointWeek = res.data || 0
      })
      getUserByid(userInfor.userId).then(e => {
       this.pointCount = e.data.point || 0
      })
    },
    loadingMore(){
      if(this.loadStatus != 'nomore') {
        this.form.pageNum++
        this.loadStatus = 'loading'
        let params = {
          ...this.form,
          drugUserid:userInfor.userId
        }
        this.$service.rating.ratingList(params).then(res=>{
          if(res.code == 200) {
            this.listData.push(...res.data.content)
            if((res.data.number+1)*res.data.size>=res.data.totalElements) {
              this.loadStatus = 'nomore'
            } else {
              this.loadStatus = 'loadmore'
            }
          }
        })
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 0 30rpx 0 30rpx;
  background: #f9fafa;
}
.ratingBg {
  width: 696rpx;
  height: 278rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -20rpx;
  margin-left: 4rpx;
}
.ratingInfo {
  position: absolute;
  left: 75rpx;
  top: 40rpx;
  .totRating {
    margin-bottom: 40rpx;
    .total {
      font-size: 48rpx;
      color: #fffdfd;
      font-weight: 500;
      margin-right: 40rpx;
    }
    .totalNum {
      color: #dd1010;
      font-weight: 700;
      font-size: 56rpx;
    }
  }

  .week,
  .weekNum {
    font-size: 40rpx;
    color: #fffdfd;
    font-weight: 400;
  }
  .weekNum {
    margin-left: 32rpx;
  }
}

.infoList {
  width: 624rpx;
  border: 2rpx solid gainsboro;
  border-radius: 32rpx;
  margin: 20rpx auto;
  .listCon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 32rpx;
    .pfmc {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30rpx;
      margin-top: 12rpx;
      font-size: 24rpx;
      .jf {
        color: #dd1010;
        font-size: 48rpx;
        font-weight: 400;
      }
    }
    .ffr {
      margin-left: 30rpx;
      font-size: 24rpx;
      margin-top: 12rpx;
    }
    .sj {
      text-align: right;
      margin-right: 64rpx;
      margin-top: 18rpx;
      color: #205ba9;
      font-size: 24rpx;
      margin-bottom: 10rpx;
    }
  }
}
.jz{
  margin-top: 68rpx;
}
</style>