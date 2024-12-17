<template>
  <view class="container">
    <u-swiper :list="bannerlist" indicator height='220px'></u-swiper>

    <view class="info cell">
      <view class="title">
        {{ prodInfo.title }}
      </view>
      <view class="price">
        ￥{{ prodInfo.price }}
      </view>
      <view class="line3">
        <view class="left">
          当前优惠 ￥0.00
        </view>
        <view class="kc">
          库存：993739
        </view>
      </view>
    </view>
    <view class="num cell">
      购买数量：<u-number-box integer button-size="28" color="#462906" bgColor="#F4F3F2"
      v-model="numValue" 
        iconStyle="color: #fff"></u-number-box>
    </view>

    <view class="prodDetailInfo">
      产品详情
    </view>

    <rich-text class="prod-detail" :nodes="yhxz"></rich-text>

    <!-- 底部按钮操作栏 -->
    <view class="bottomViewPlaceholder" >

    </view>
    <view class="bottomView">
      <view class="left first" @click="toMenu">
        <img src="@/static/yw/icon/1.png" class="icon" />
        <view class="txt" >
          首页
        </view>

      </view>
      <view class="left first" @click="toCar" >
        <img src="@/static/yw/icon/2.png" class="icon" />
        <view class="txt" >
          购物车
        </view>

      </view>
      <view class="btns">
        <view class="car" @click="addCar" >
          加入购物车
        </view>
        <view class="buy" @click="buyNow">
          立即购买
        </view>
      </view>
    </view>
  </view>
</template>

<script>

export default {

  data() {
    return {
      numValue:1,
      prodInfo: {
        title: '商品标题商品标题商品标题品标题商品标题商品标题品标商品标题商品标',
        price: 883749,
      },
      yhxz: '<p><img src="https://lwzx.wuchuangroup.com/img/2024/12/4e7f2c3a5cb8460085b9e53bf75b3c9a.png" alt=""></p>'.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '),
      bannerlist: [require("@/static/yw/swiper/hb1.png"), require("@/static/yw/swiper/hb1.png")],
    };
  },

  methods: {
    toMenu(){
      uni.switchTab({ url: '/yw/menu/index' })
    }, toCar(){
      uni.switchTab({ url: '/yw/car/index' })
    },
    addCar(){
      uni.showToast({
          title: '加入购物车成功',
          icon: 'success'
        })
    },buyNow(){
      uni.navigateTo({ url: '/yw/submit/index' })
    }

  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  background-color: #F4F3F2;


  .cell {
    padding: 15px 17px;
    background-color: #fff;
    border-radius: 6px;
  }

  .info {
    margin: 10px;

    .title {
      color: #222222;
      font-size: 16px;
      width: 100%;
      font-weight: Medium;
      overflow: hidden;
      /* 隐藏溢出的内容 */
      text-overflow: ellipsis;
      /* 使用省略号表示溢出的文本 */
      display: -webkit-box;
      /* 将对象作为弹性伸缩盒子模型显示 */
      -webkit-box-orient: vertical;
      /* 垂直排列子元素 */
      -webkit-line-clamp: 1;
      /* 限制在两行文本 */
    }

    .price {
      color: #B1771A;
      font-size: 26px;
      font-weight: Heavy;
      font-family: Source Han Serif CN-Heavy;
      margin-top: 16px;
      margin-bottom: 8px;
    }

    .line3 {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        padding: 5px 8px;
        color: #B1771A;
        border: 1px solid #B1771A;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: Regular;
      }

      .kc {
        color: #999999;
        font-size: 14px;
        font-weight: Regular;
      }
    }
  }

  .num {
    margin: 10px;
    color: #666666;
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  .prodDetailInfo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
    color: rgba(70, 41, 6, 0.22);
    font-weight: 600;
    font-size: 14px;
  }

  .prod-detail {}

  .bottomViewPlaceholder {
    height: calc(70px + env(safe-area-inset-bottom));

  }



  .bottomView {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 14px 18px;
    padding-bottom: calc(10px + env(safe-area-inset-bottom));
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;



    .left {
      margin-right: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #666666;
      font-size: 12px;

      .icon {
        width: 24px;
        height: 24px;
      }

      .txt {
        // margin-top: 7px;
      }
    }

    .btns {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 14px;

      .car {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #EF432A;
        border-radius: 8px 0px 0px 8px;
        width: 100%;
        height: 42px;

        color: #EF432A;
        background-color: #fff;
        flex-wrap: nowrap;
      }

      .buy {
        display: flex;
        align-items: center;
        justify-content: center;
         width: 100%;
         height: 42px;

        border: 1px solid #EF432A;
        border-radius: 0px 8px 8px 0px;
        color: #fff;
        background-color: #EF432A;
        flex-wrap: nowrap;

      }
    }
  }

}
</style>
