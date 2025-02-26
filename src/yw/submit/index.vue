<template>
  <view class="container">
    <!-- 商品卡片 -->
    <view class="prodList">
      <view class="prod" v-for="(item, index) in prodList" :key="index">
        <img :src="item.imageUrl" class="prodImage" />
        <view class="prodinfo">
          <view class="title">
            {{ item.storeName }}
          </view>
          <view class="gg">
            规格：无
          </view>
          <view class="info">
            <view class="price1">
              ￥{{ item.price }}
            </view>
            <view class="price2">
              ￥{{ item.otPrice }}
            </view>
            <view class="buy">
              x{{ item.count }}

            </view>

          </view>
        </view>
      </view>
    </view>

    <!-- 收货地址 -->
    <view class="address" @click="toAddress">
      <img class="icon" src="@/static/yw/address.png" alt="">
      <view class="content">

        {{ !!userAddr.realName ? userAddr.realName + ' ' + userAddr.phone : '收货地址' }}

      </view>
      <view>
        {{ !!userAddr.district ? userAddr.district + userAddr.detail : '' }}
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
          ￥{{ price }}
        </view>
      </view>
      <view class="infoItem">
        <view class="lab">
          优惠
        </view>
        <view class="value">
          -￥{{ yhPrice }}
        </view>
      </view>
      <!-- <view class="infoItem">
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
      </view> -->
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
      <view class="left">
        实付款：￥{{ price - yhPrice }}
      </view>

      <view class="right" @click="submitOrder">
        提交订单
      </view>
    </view>
  </view>
</template>

<script>
import { getAddressList, createOrder, payOrder, jsapiPayOrder } from '@/api/info'

export default {

  data() {
    return {
      prodList: [],
      userAddr: {},
      storeOrderId:''
    };
  },
  computed: {

    price() {
      return this.prodList.reduce((prev, curr) => prev + curr.price * curr.count, 0)
    },
    yhPrice() {
      return this.prodList.reduce((prev, curr) => prev + (curr.price - curr.otPrice) * curr.count, 0)
    },
  },
  onShow() {
    // if (!this.$mp.query.car) 
    this.prodList = uni.getStorageSync('orderInfoArr')
    const pages = getCurrentPages();
    const currPage = pages[pages.length - 1];
    if (currPage.selAddress === 'yes') {
      this.userAddr = currPage.item;
      console.log(this.userAddr);
    } else {
      getAddressList().then((res) => {
        if (res.data.length > 0) {
          this.userAddr = res.data[0]
        }
      })
    }
  },

  methods: {
    // data为网页端接口请求参数列表
    onBridgeReady(data) {
      console.log(666,data);

      let that = this
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          // 公众号名称，由商户传入
          appId: data.appId,
          // 时间戳，自1970年以来的秒数
          timeStamp:data.timeStamp,
          // 随机串
          nonceStr: data.nonceStr,
          package: data.packageValue,
          // 微信签名方式：
          signType: data.signType,
          // 微信签名
          paySign: data.paySign,
        },
        function (res) {
          console.log('支付完成',res,that.storeOrderId);
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            console.log('支付完成',that.storeOrderId);
            uni.navigateTo({ url: '/yw/pay-result/index?storeOrderId='+that.storeOrderId })

          }
        }
      );
    },
    submitOrder() {
      if (this.userAddr.userAddressId) {
        const params = {}
        params.bos = this.prodList.map(item => {
          return {
            productId: item.storeProductId,
            count: item.count,
          }
        })
        params.userAddressId = this.userAddr.userAddressId

        let that = this
        createOrder(params).then(res => {
          console.log((/micromessenger/.test(navigator.userAgent.toLowerCase())));
          if ((/micromessenger/.test(navigator.userAgent.toLowerCase()))) {
            // 带着orderId跳转到支付页逻辑
            console.log('微信浏览器');
            this.storeOrderId = res.data.storeOrderId
            jsapiPayOrder(res.data.storeOrderId).then(e => {
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
                } else if (document.attachEvent) {
                  document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
                  document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
                }
              } else {
                that.onBridgeReady(e.data);
              }
            })
          } else {
            console.log('非微信浏览器');
            // 执行H5支付中的创建订单之后的逻辑
            payOrder(res.data.storeOrderId).then(e => {
              let redirect_url = e.data.mwebUrl + '&redirect_url=' + encodeURIComponent('https://jinriyouli.cn/yw/pay-result/index?storeOrderId=' + res.data.storeOrderId);
              console.log(redirect_url, document.referrer, 999);
              window.location.href = redirect_url
            })
          }
        })
      } else {
        uni.$u.toast('请选择地址');
      }
    },
    toAddress() {
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
          box-sizing: border-box;
          padding-left: 0;

          .price1 {
            color: #B1771A;
            font-size: 16px;
            font-weight: 500;
            margin-right: 8px;
            font-family: Source Han Serif CN-Sem;
          }

          .price2 {
            font-family: Source Han Serif CN-Sem;
            color: #999999;
            font-size: 12px;
            font-weight: 500;
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

  .bottomView {
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

    .left {
      flex: 1;
      color: #B1771A;
      font-size: 16px;
      margin-left: 20px;
      font-family: PingFang SC-Regular;
      font-weight: 500;

    }

    .right {
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
