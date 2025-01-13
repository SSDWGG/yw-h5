<template>
  <view class="container">
    <u-swiper :list="[prodInfo.sliderImageUrl, prodInfo.sliderImageUrl]" indicator height='220px'></u-swiper>

    <view class="info cell">
      <view class="title">
        {{ prodInfo.storeName }}
      </view>
      <view class="price">
        ￥{{ prodInfo.price }}
      </view>
      <view class="line3" v-if="prodInfo.isVip">
        <view class="left">
          当前优惠 ￥{{ prodInfo.vipPrice }}
        </view>
        <view class="kc">
          库存：{{ prodInfo.stock }}
        </view>
      </view>
    </view>
    <view class="num cell">
      购买数量：<u-number-box integer button-size="28" color="#462906" bgColor="#F4F3F2" v-model="numValue"
        iconStyle="color: #fff"></u-number-box>
    </view>

    <view class=" cell2">
      <view class="titleMain">
        服务
      </view>
      <view class="title">
        无忧售后
      </view>

      <view class="content">
        退货运费保障:商品退货可联系官方客服提供运费补贴，或者采用运费到付的方式发货，具体以客服回复为准。
      </view>



      <view class="title">
        7天无理由退换
      </view>

      <view class="content">
        满足相应条件(包装损毁/使用/影响二次销售不支持)时，消费者可联系客服申请退换货。
      </view>

      <view class="title">
        客服电话：15155500918
      </view>
      <view class="title">
        客服微信:w18158830995
      </view>
    </view>

    <view class="prodDetailInfo">
      产品详情
    </view>

    <rich-text class="prod-detail" :nodes="prodInfo.description
      "></rich-text>

    <!-- 底部按钮操作栏 -->
    <view class="bottomViewPlaceholder">

    </view>
    <view class="bottomView">
      <view class="left first" @click="toMenu">
        <img src="@/static/yw/icon/1.png" class="icon" />
        <view class="txt">
          首页
        </view>

      </view>
      <view class="left first" @click="toCar">
        <img src="@/static/yw/icon/2.png" class="icon" />
        <view class="txt">
          购物车
        </view>

      </view>
      <view class="btns">
        <view class="car" @click="addCar">
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
import { getProdItem } from '@/api/info'
import { addToCar } from '@/api/info'

export default {

  data() {
    return {
      numValue: 1,
      prodInfo: {},
    };
  },
  created() {
    getProdItem(this.$mp.query.storeProductId).then(res => {
      this.prodInfo = res.data
      this.prodInfo.description = this.prodInfo.description.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
    })
  },
  methods: {
    toMenu() {
      uni.switchTab({ url: '/yw/menu/index' })
    }, toCar() {
      uni.switchTab({ url: '/yw/car/index' })
    },
    addCar() {
      addToCar({
        productId: this.$mp.query.storeProductId,
        cartNum: this.numValue
      }).then(res => {
        uni.showToast({
          title: '加入购物车成功',
          icon: 'success'
        })
      })

    },
    buyNow() {
      this.prodInfo.count = this.numValue
      uni.setStorageSync('orderInfoArr', [this.prodInfo])
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

  .cell2 {
    padding: 8px 16px;
    background-color: #fff;
    border-radius: 6px;

    margin: 10px;

    .titleMain {
      color: #999999;
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 9px;
    }

    .title {
      color: #666666;
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 5px;

    }

    .content {
      color: #999999;
      font-size: 12px;
      font-size: 400;
      margin-bottom: 18px;
    }
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
      font-family: Source Han Serif CN-Heavy;
      margin-top: 16px;
      margin-bottom: 8px;
      font-weight: 500;
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
