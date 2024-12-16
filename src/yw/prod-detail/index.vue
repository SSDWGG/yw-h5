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
        iconStyle="color: #fff"></u-number-box>
    </view>

    <view class="prodDetailInfo">
      产品详情
    </view>

    <!-- 底部按钮操作栏 -->
    
  </view>
</template>

<script>

export default {

  data() {
    return {
      prodInfo: {
        title: '商品标题商品标题商品标题品标题商品标题商品标题品标商品标题商品标',
        price: 883749,

      },

      bannerlist: [require("@/static/yw/swiper/hb1.png"), require("@/static/yw/swiper/hb1.png")],
    };
  },

  methods: {


  },
};
</script>

<style lang="scss" scoped>
.container {
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


}
</style>
