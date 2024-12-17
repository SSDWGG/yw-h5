<template>
  <view class="container">
    <view class="bgcolor">

    </view>
    <img class="titleBg" src="@/static/yw/me/headerBg.png">

    <view class="haeadInfo">
      <img class="avatar" :src="userInfo.avatar">
      <view class="info">
        <view class="line1">
          <view class="name">
            {{ userInfo.username }}

          </view>
          <view class="dj">
            <img class="djIcon" :src="userInfo.djIcon">
            {{ userInfo.djName }}
          </view>
        </view>
        <view class="line2">
          {{ userInfo.phone }}
        </view>
      </view>
    </view>

    <view class="priceInfo">
      <view class="priceInfoItem">
        <view class="price">
          {{ priceInfo.price1 }}
        </view>
        <view class="name">
          今日收益(元)
        </view>
      </view>
      <view class="priceInfoItem">
        <view class="price">
          {{ priceInfo.price2 }}
        </view>
        <view class="name">
          总收益(元)
        </view>
      </view>
      <view class="priceInfoItem">
        <view class="price">
          {{ priceInfo.price3 }}
        </view>
        <view class="name">
          钱包余额(元)
        </view>
      </view>
    </view>

    <!-- order -->

    <view class="modeView">
      <view class="header">
        <view class="txt">
          我的订单
        </view>
      </view>
    </view>

    <Tabbar current="我的"></Tabbar>
  </view>
</template>
<script>
import Tabbar from "@/components/Tabbar.vue";
export default {
  components: {
    Tabbar
  },
  data() {
    return {
      userInfo: {
        avatar: require("@/static/yw/prodDetail.png"),
        phone: 13333333333,
        username: 'aa啊啊凡凡',
        djIcon: require("@/static/yw/hyicon.png"),
        djName: '金粉'
      }, 
      priceInfo: {
        price1: 66345,
        price2: 66345,
        price3: 66345,
      },
      orderType:[
        {
          orderTypeName:'全部',
          icon:require("@/static/yw/me/orderType/1.png")
        },
        {
          orderTypeName:'待付款',
          icon:require("@/static/yw/me/orderType/2.png")
        },
        {
          orderTypeName:'待发货',
          icon:require("@/static/yw/me/orderType/3.png")
        },
        {
          orderTypeName:'已发货',
          icon:require("@/static/yw/me/orderType/4.png")
        },
      ], 
      fxType:[
        {
          orderTypeName:'我的团队',
          icon:require("@/static/yw/me/fxType/1.png")
        },
        {
          orderTypeName:'邀请用户',
          icon:require("@/static/yw/me/fxType/2.png")
        },
        {
          orderTypeName:'客服留言',
          icon:require("@/static/yw/me/fxType/3.png")
        }
      ]
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  position: relative;

  .bgcolor {
    background: #F7F4F0;
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

  .haeadInfo {
    display: flex;
    padding: 30px 18px;
    margin-bottom: 25px;

    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 23px;
    }

    .info {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;

      .line1 {
        margin-bottom: 5px;
        display: flex;
        align-items: center;

        .name {
          color: #462906;
          font-size: 16px;
          font-weight: 600;
        }

        .dj {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 14px;
          background-color: #462906;
          padding: 4px 7px;
          border-radius: 20px;
          color: #fff;
          font-size: 12px;
          font-weight: 500;

          .djIcon {
            width: 18px;
            height: 15px;
            margin-right: 2px;
          }
        }
      }

      .line2 {
        color: #462906;
        font-size: 12px;
        font-weight: 500;
      }
    }
  }

  .priceInfo {
    display: flex;
    padding: 5px;


    .priceInfoItem {
      margin: 0px 21px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .price {
        margin-bottom: 5px;
        color: #A05D15;
        font-size: 18px;
        font-family: Source Han Serif CN-SemiBold;
        font-weight: 500;
      }

      .name {
        color: #775C3B;
        font-size: 14px;
      }
    }
  }
}
</style>
