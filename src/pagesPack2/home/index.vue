<template>
  <view class="container">
    <u-swiper :list="bannerlist"></u-swiper>
    <view class="card">
      <card :isShadow="true">
        <homePie :ryfxList="ryfxList"/>
      </card>
    </view>
    <view class="card">
      <card :isShadow="true">
        <homeBar :shztList="shztList"/>
      </card>
    </view>
    <view class="card">
      <card :isShadow="true">
        <homeLine :xdryqst="xdryqst"/>
      </card>
    </view>
    <Tabbar current="首页"></Tabbar>
  </view>
</template>

<script>
import Card from '@/components/Card.vue'
import homePie from './components/homePie.vue';
import homeBar from './components/homeBar.vue';
import homeLine from './components/homeLine.vue';
import Tabbar from '@/components/Tabbar.vue'
export default {
  components:{
    Card,
    homePie,
    homeBar,
    homeLine,
    Tabbar
  },
  data(){
    return {
      bannerlist: ['https://gayws.wuchuangroup.com:8443/prod-api/profile/upload/banner/banner3.jpg'],
      ryfxList:{
        gfx: 0,
        zfx: 0,
        dfx: 0
      },
      shztList:{},
      xdryqst:[]
    }
  },
  mounted(){
   this.getChart()
  },
  onShow(){
    this.getChart()
  },
  onLoad(){
    this.getChart()
    // uni.hideTabBar()
    this.userType = uni.getStorageSync('userType')
        if(this.userType == '禁毒中队') {
            uni.setTabBarItem({
                index:0,
                visible:true,
            })
        }
  },
  methods:{
    getChart(){
      this.$service.login.getChartData().then(res => {
        if (res.code == 200) {
          this.ryfxList = res.data.drugUserRiskLevelStats
          this.shztList = res.data.drugUserStatusStats
          this.xdryqst = res.data.drugUserTrendList
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
}
.card {
  margin-top: 30rpx;
}
</style>