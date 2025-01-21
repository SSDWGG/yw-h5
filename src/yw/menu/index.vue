<template>
  <view class="container">
    <u-swiper :list="bannerlist" indicator height='220px'  keyName="bannerImageUrl"></u-swiper>

    <!-- 入口 -->
    <view class="rkList">
      <view class="rkItem" v-for="(item, index) in rkList" :key=index @click="toProdList(item)">
        <view class="txt">
          {{ item.cateName }}
        </view>
        <img :src="item.picUrl" class="bg" />
      </view>
    </view>
    <!-- 会员 -->
    <view class="hy">
      <!-- <img src="@/static/yw/hyicon.png" class="hyicon" />
      <view class="txt">
        会员终身制 享¥46/盒
      </view>
      <view class="go" >
        <u-icon name="arrow-right" color="#B1742F" size="12">
          ></u-icon>
      </view> -->
      <img src="@/static/yw/hycardrk.png" class="hyiconAll" @click="toHy" />
    </view>
    <!-- 商品卡片 -->
    <view class="prodList">
      <view class="prod" v-for="(item,index) in prodList" :key="index" @click="handleBuy(item.storeProductId)">
        <img :src="item.imageUrl" class="prodImage" />
        <view class="title">
          {{ item.storeName }}
        </view>
        <view class="info">
          <view class="price1">
            ￥{{item.price}}
          </view>
          <view class="price2">
            ￥{{item.otPrice}}
          </view>
          <view class="buy">
            <u-button color="linear-gradient(to bottom, #F9694C, #F22020)" text="立即购买" class="btn"
              ></u-button>

          </view>

        </view>
      </view>
    </view>

    <view class="menuBottom">
        <view class="line1" >
          <view @click="previewImg" >
            营业执照
          </view>
           <view class="line0" /> 
           <a href="https://beian.miit.gov.cn/index.html#/Integrated/recordQuery">
           icp备案：皖ICP备2025072638号
          </a>
        </view>
        <view class="line2">
          客服热线：4180995 
        </view>
        <view class="line2">
          公司名称：安徽金义源供应链有限公司 
        </view>
        <view class="line2">
          地址：安徽省宣城市宁国市西津街道青龙东路津桥学苑1幢1009、2009号
        </view>
    </view>
    <Tabbar current="首页"></Tabbar>
  </view>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue";
import { getBannerList,getProdList,getCategoryAll } from '@/api/info'

export default {
  components: {
    Tabbar
  },
  data() {
    return {
      rkList: [],
      prodList:[],
      bannerlist: [],
    };
  },
  created(){
    getBannerList().then((res)=>{
      this.bannerlist = res.data
    })
    getProdList({isVip:1}).then((res)=>{
      this.prodList = res.rows
    })
    getCategoryAll().then((res)=>{
      this.rkList = res.data
    })
  },

  methods: {
    previewImg(){
      uni.previewImage({
        urls:['https://ywmall.ssdwgg.cn/mall/2025/01/20/8d64ec99576546599c726aa4d7c3893d.jpg']
      })
    },
    previewImg2(){
      uni.previewImage({
        urls:['https://ywmall.ssdwgg.cn/mall/2025/01/20/8d64ec99576546599c726aa4d7c3893d.jpg']
      })
    },
    toProdList(item){
      console.log(item.isVip);
      if(item.isVip==='1'){
        uni.navigateTo({ url: '/yw/prod-list/index?isVip=true' })
      }else{
        uni.navigateTo({ url: '/yw/prod-list/index' })
      }
     
    },
    handleBuy(storeProductId) {
      uni.navigateTo({ url: `/yw/prod-detail/index?storeProductId=${storeProductId}` })
    },
    toHy() {
      uni.navigateTo({ url: '/yw/hy/index' })
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 15px 16px;
  background: #fff;

  .rkList {
    display: flex;

    .rkItem {
      flex: 1;
      color: #FFF8E9;
      font-weight: Medium;
      font-size: 14px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 36px;

      .txt {
        width: 28px;
        z-index: 999;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }

      .bg {
        width: 100px;
        height: 100px;
      }
    }
  }

  .hy {
    display: flex;
    background-color: #FFF7E8;
    border-radius: 10px;
    padding: 11px 12px;
    align-items: center;
    margin-top: 20px;

    .hyiconAll {
      width: 100%;
    }

    .hyicon {
      width: 27px;
      height: 24px;
      margin-right: 14px;
    }

    .txt {
      font-family: Source Han Serif CN-Sem;
      font-size: 18px;
      font-weight: 700;
      color: #BD7527;
    }

    .go {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .prodList {

    .prod {
      margin-top: 13px;
      border: 1px solid #EDE3D8;
      border-radius: 10px;

      .prodImage {
        width: 100%;
      }

      .title {
        padding: 15px 16px;
        color: #222222;
        font-size: 14px;
        font-weight: Medium;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .info {
        padding: 20px 16px;
        display: flex;
        align-items: center;

        .price1 {
          color: #B1771A;
          font-size: 16px;
          font-weight: 600;
          margin-right: 13px;
          font-family: Source Han Serif CN-Sem;
        }

        .price2 {
          font-family: Source Han Serif CN-Sem;
          color: rgba(70, 41, 6,.3);
          text-decoration: line-through;
          font-size: 14px;
          font-weight: 500;

        }

        .buy {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          .btn {
            margin: 0;
            width: 77px;
            height: 28px;
          }

        }
      }
    }
  }
  .menuBottom{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 30px;
    .line1{
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666666;
      font-size: 11px;
      font-weight: 300;
      margin-bottom: 20px;
      .line0{
        border-left: 1px solid #666;
        width: 0;
        height: 7px;
        margin: 0 15px;
      }
    }
    .line2{
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 11px;
      font-weight: 300;
      text-align: center;
    }
  }
}
</style>
