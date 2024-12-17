<template>
  <view class="container">
    <!-- 商品卡片 -->
    <view class="prodList">
      <view class="prod" v-for="(item, index) in prodList" :key="index">
        <img :src="item.prodImage" class="prodImage" />
        <view class="prodinfo">
          <view class="title">
            {{ item.title }}
          </view>
          <view class="gg">
            规格：无
          </view>
          <view class="info">
            <view class="price1">
              ￥{{ item.price1 }}
            </view>
            <view class="price2">
              ￥{{ item.price2 }}
            </view>
            <view class="buy">
              x1

            </view>

          </view>
        </view>
      </view>
    </view>
    <!-- 收货地址 -->
    <view class="address" @click="toAddress">
      <img class="icon" src="@/static/yw/address.png" alt="">
      <view class="content" hover-class="none" hover-stop-propagation="false">
        收货地址
      </view>
      <u-icon class="go" name="arrow-right" color="#666666" size="12">
        ></u-icon>
    </view>

    <!-- info -->
    <view class="info">
      <view class="infoItem">
        <view class="lab">
          商品金额
        </view>
        <view class="value price">
          ￥{{ orderObj.price }}
        </view>
      </view>
      <view class="infoItem">
        <view class="lab">
          优惠
        </view>
        <view class="value">
          -￥{{ orderObj.yh }}
        </view>
      </view>
      <view class="infoItem">
        <view class="lab">
          运费
        </view>
        <view class="value">
          ￥{{ orderObj.yf }}
        </view>
      </view>
      <view class="infoItem">
        <view class="lab">
          代金券
        </view>
        <view class="value">
          <u-switch space="2" v-model="orderObj.djq" activeColor="#f9ae3d" size="20" inactiveColor="rgb(230, 230, 230)">
          </u-switch>
        </view>
      </view>

      <view class="infoItem">
        <view class="lab">
          代金券抵扣
        </view>
        <view class="value">
          -￥{{ orderObj.djqPrice }}
        </view>
      </view>
      <view class="infoItem">
        <view class="lab">
          支付方式
        </view>
        <view class="value">
          <img class="wechatIcon" src="@/static/yw/wechatIcon.png" alt="">

        </view>
      </view>
    </view>

    <!-- 底部按钮操作栏 -->
    <view class="bottomViewPlaceholder" />
    <view class="bottomView">
      <view class="left" >
        实付款：￥{{ orderObj.sfk }}
      </view>

      <view class="right" hover-class="none" hover-stop-propagation="false">
        提交订单
      </view>
    </view>
  </view>
</template>

<script>

export default {

  data() {
    return {
      prodList: [{
        title: '精品燕窝精品燕窝商品标题',
        price1: 55644,
        price2: 55644,
        prodImage: require("@/static/yw/prodDetail.png")
      }, {
        title: '精品燕窝商品标题商品标精品燕窝商品标题精品燕窝商品品标题精品燕窝精品燕窝商品标题商品标题商品标题',
        price1: 55644,
        price2: 55644,
        prodImage: require("@/static/yw/prodDetail.png")
      }],
      orderObj: {
        price: 56588,
        yh: 0.00,
        yf: 0.00,
        djq: true,
        djqPrice: 0.00,
        sfk:56588

      }
    };
  },

  methods: {

    toAddress(){
      uni.navigateTo({ url: '/yw/address/index' })

    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 10px;
  background: #F4F3F2;
  height: 100vh;

  .prodList {
    .prod {
      padding: 11px 10px;
      display: flex;
      border-radius: 10px;
      background-color: #fff;
      margin-top: 10px;

      .prodImage {
        width: 107px;
        height: 107px;
        margin-right: 16px;
      }

      .prodinfo {

        flex: 1;
        padding: 3px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        .title {
          color: #222222;
          font-size: 14px;
          width: 100%;
          font-weight: 500;
          overflow: hidden;
          /* 隐藏溢出的内容 */
          text-overflow: ellipsis;
          /* 使用省略号表示溢出的文本 */
          display: -webkit-box;
          /* 将对象作为弹性伸缩盒子模型显示 */
          -webkit-box-orient: vertical;
          /* 垂直排列子元素 */
          -webkit-line-clamp: 2;
          /* 限制在两行文本 */
        }

        .gg {
          color: #999999;
          font-size: 14px;
        }

        .info {
          display: flex;
          align-items: flex-end;
          width: 100%;

          .price1 {
            color: #B1771A;
            font-size: 16px;
            font-weight: SemiBold;
            margin-right: 8px;
            font-family: Source Han Serif CN-Sem;
          }

          .price2 {
            font-family: Source Han Serif CN-Sem;
            color: #999999;
            font-size: 12px;
            font-weight: SemiBold;
            text-decoration: line-through;
          }

          .buy {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: #666666;
            font-size: 12px;
          }
        }
      }
    }
  }

  .address {
    background-color: #fff;
    padding: 15px 12px;
    border-radius: 10px;
    display: flex;
    margin-top: 16px;

    .icon {
      width: 15px;
      height: 15px;
      margin-top: 2px;
      margin-right: 8px;
    }

    .content {
      flex: 1;
      color: #222222;
      font-size: 14px;
    }

    .go {}
  }

  .info {
    background-color: #fff;
    padding: 13px;
    border-radius: 10px;
    margin-top: 16px;

    .infoItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;

      .lab {
        color: #666666;
        font-size: 14px;
      }

      .value {
        color: #462906;
        font-size: 14px;
        letter-spacing: -3px;
      }

      .price {
        color: #B1771A;
        font-size: 16px;
        font-weight: 500;
        font-family: Source Han Serif CN-SemiBold;
        letter-spacing: -1px;
      }

      .wechatIcon {
        width: 25px;
        height: 25px;
      }
    }
  }

  .bottomViewPlaceholder {
    height: calc(70px + env(safe-area-inset-bottom));
  }
  .bottomView{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 14px 8px;
    padding-bottom: calc(10px + env(safe-area-inset-bottom));
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    .left{
      flex: 1;
      color: #B1771A;
      font-size: 16px;
      margin-left: 20px;
      font-family: PingFang SC-Regular;
    }
    .right{
      padding: 11px 25px;
      border-radius: 6px;
      background-color: #EF432A;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
