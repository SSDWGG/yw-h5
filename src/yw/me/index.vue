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

    <view class="modeView">
      <view class="header">
        <view class="txt">
          我的订单
        </view>
      </view>
      <view class="content">
        <view class="contentItem" v-for="(item, index) in orderType" :key="index" @click="item.request()">
          <view class="icon" hover-class="none" hover-stop-propagation="false">
            <img class="iconImg" :src="item.icon">
          </view>
          <view class="name" hover-class="none" hover-stop-propagation="false">
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>

    <view class="modeView fx">
      <view class="header">
        <view class="txt">
          分销中心
        </view>
        <u-icon name="arrow-right" size="12" />
      </view>
      <view class="content">
        <view class="contentItem" v-for="(item, index) in fxType" :key="index" @click="item.request()">
          <view class="icon" hover-class="none" hover-stop-propagation="false">
            <img class="iconImg" :src="item.icon">
          </view>
          <view class="name" hover-class="none" hover-stop-propagation="false">
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>

    <view class="mainInfo">
      <view class="infoItem" v-for="(item, index) in infoType" :key="index" @click="item.request()">
        <img class="iconImg" :src="item.icon">
        <view class="name" hover-class="none" hover-stop-propagation="false">
          {{ item.name }}

        </view>
        <u-icon name="arrow-right" size="12" />

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
      orderType: [
        {
          name: '全部',
          icon: require("@/static/yw/me/orderType/1.png"),
          request:()=>{ uni.navigateTo({ url: '/yw/my-order/index' })}

        },
        {
          name: '待付款',
          icon: require("@/static/yw/me/orderType/2.png"),
          request:()=>{ uni.navigateTo({ url: '/yw/my-order/index' })}
        },
        {
          name: '待发货',
          icon: require("@/static/yw/me/orderType/3.png"),
          request:()=>{ uni.navigateTo({ url: '/yw/my-order/index' })}
        },
        {
          name: '已发货',
          icon: require("@/static/yw/me/orderType/4.png"),
          request:()=>{ uni.navigateTo({ url: '/yw/my-order/index' })}
        },
      ],
      fxType: [
        {
          name: '我的团队',
          icon: require("@/static/yw/me/fxType/1.png")
        },
        {
          name: '邀请用户',
          icon: require("@/static/yw/me/fxType/2.png")
        },
        {
          name: '客服留言',
          icon: require("@/static/yw/me/fxType/3.png")
        }
      ],
      infoType: [
        {
          name: '我的信息',
          icon: require("@/static/yw/me/infoType/1.png"),
          request:()=>{ uni.navigateTo({ url: '/yw/edit-info/index' })}

        },
        {
          name: '修改密码',
          icon: require("@/static/yw/me/infoType/2.png"),
          request:()=>{ uni.navigateTo({ url: '/yw/edit-password/index' })}

        },
        {
          name: '银行卡',
          icon: require("@/static/yw/me/infoType/3.png"),
          request:()=>{ uni.navigateTo({ url: '/yw/yh-card/index' })}

        },
        {
          name: '收货地址',
          icon: require("@/static/yw/me/infoType/4.png"),
          request:()=>{ uni.navigateTo({ url: '/yw/address/index?from=me' })}
        },
        {
          name: '退出',
          icon: require("@/static/yw/me/infoType/5.png"),
          request:()=>{ console.log('退出');}
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

  .mainInfo{
    margin: 17px 16px;
    border-radius: 10px;
    background-color: #FFFFFF;
    .infoItem{
      padding: 15px 13px;
      display: flex;
      align-items: center;
      .iconImg{
        width: 21px;
        height: 21px;
        margin-right: 13px;
      }
      .name{
        flex: 1;
        display: flex;
        align-items: center;
        color: #222222;
        font-size: 14px;
      }
    }
  }

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
    padding-bottom: 25px;

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
        color: rgb(70, 41, 6, .63);
        font-size: 12px;
        font-weight: 500;
      }
    }
  }

  .priceInfo {
    display: flex;
    padding: 5px;
    margin-bottom: 20px;

    .priceInfoItem {
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

  .modeView {
    margin: 0 16px;
    border-radius: 10px;
    background-color: #fff;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      border-bottom: 1px solid rgba(70, 41, 6, .1);

      .txt {
        color: #222222;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .content {
      padding: 20px 26px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .contentItem {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .icon {
          width: 41px;
          height: 41px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom, #D3AC85, #C39963);

          .iconImg {
            width: 25px;
            height: 25px;
          }
        }

        .name {
          margin-top: 10px;
          color: #222222;
          font-size: 14px;
        }
      }
    }
  }

  .fx {
    margin-top: 15px;
  }
}
</style>
