<template>
  <view class="container">
    <u-swiper :list="bannerlist" indicator height='220px'></u-swiper>

    <!-- 入口 -->
    <view class="rkList">
      <view class="rkItem" v-for="(item, index) in rkList" :key=index @click="toProdList">
        <view class="txt">
          {{ item.title }}
        </view>
        <img :src="item.bg" class="bg" />
      </view>
    </view>
    <!-- 会员 -->
    <view class="hy">
      <!-- <img src="@/static/yw/hyicon.png" class="hyicon" />
      <view class="txt">
        会员终身制 享¥46/盒
      </view>
      <view class="go" hover-class="none" hover-stop-propagation="false">
        <u-icon name="arrow-right" color="#B1742F" size="12">
          ></u-icon>
      </view> -->
      <img src="@/static/yw/hycardrk.png" class="hyiconAll" @click="toHy" />
    </view>
    <!-- 商品卡片 -->
    <view class="prodList">
      <view class="prod" v-for="(item,index) in prodList" :key="index">
        <img :src="item.prodImage" class="prodImage" />
        <view class="title">
          {{ item.title }}
        </view>
        <view class="info">
          <view class="price1">
            ￥{{item.price1}}
          </view>
          <view class="price2">
            ￥{{item.price2}}
          </view>
          <view class="buy">
            <u-button color="linear-gradient(to bottom, #F9694C, #F22020)" text="立即购买" class="btn"
              @click="handleBuy"></u-button>

          </view>

        </view>
      </view>
    </view>
    <Tabbar current="首页"></Tabbar>
  </view>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue";
import Card from "@/components/Card.vue";
export default {
  components: {
    Card,
    Tabbar
  },
  data() {
    return {
      rkList: [
        {
          title: '零售专区',
          bg: require("@/static/yw/rkbg.png")
        }, {
          title: '复购专区',
          bg: require("@/static/yw/rkbg.png")
        }, {
          title: '配件专区',
          bg: require("@/static/yw/rkbg.png")
        }
      ],
      prodList:[{
        title:'商品标题商品标题商品标题商品品标题商品标题商品标题商品标题',
        price1:55644,
        price2:55644,
        prodImage:require("@/static/yw/prod1.png")
      },{
        title:'商品标题商品标题商品标题商品品标题商品标题商品标题商品标题',
        price1:55644,
        price2:55644,
        prodImage:require("@/static/yw/prod2.png")
      }],
      bannerlist: [require("@/static/yw/swiper/hb1.png"), require("@/static/yw/swiper/hb1.png")],
    };
  },

  methods: {
    toProdList(){
      uni.navigateTo({ url: '/yw/prod-list/index' })
    },
    handleBuy() {
      uni.navigateTo({ url: '/yw/prod-detail/index' })
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
        width: 30px;
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
          font-weight: 400;
          text-decoration: line-through;
          font-size: 14px;
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
}
</style>
