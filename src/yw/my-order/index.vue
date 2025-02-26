<template>
  <view class="container">
    <!-- header -->
    <view class="headerList">
      <view :class="[Number(activeIndex) === item.index ? 'activeIndex' : '']" class="headerItem"
        v-for="(item, index) in headerList" :key="index" @click="() => {
          activeIndex = item.index
        }">
        {{ item.title }}
      </view>
    </view>
    <!-- 商品卡片 -->
    <view class="prodList">
      <view class="prodView" v-for="(prodItem, index) in prodList" :key="index">
        <view class="skuItem" v-for="(item, index) in prodItem.cartInfoList" v-if="!!prodItem.cartInfoList" :key="index">
          <view class="prod">
            <img :src="item.product.imageUrl" class="prodImage" />
            <view class="prodinfo">
              <view class="title">
                {{ item.product.storeName }}
              </view>
              <view class="gg">
                规格：无
              </view>
              <view class="info">
                <view class="price1">
                  ￥{{ item.product.price }}
                </view>
                <view class="price2">
                  ￥{{ item.product.otPrice }}
                </view>
                <view class="buy">
                  x{{ JSON.parse(item.cartInfo).count }}
                </view>

              </view>
            </view>
          </view>
         
        </view>
        <view class="jsTabbar">
            <view class="tip">
              <!-- {{ statusMap[prodItem.status] }} -->
              {{prodItem.statusName }}

            </view>

            <view class="info">
              <view class="info1">
                实付款
              </view>
              <view class="info2">

                <view class="num">
                  ￥{{ prodItem.payPrice }}
                </view>
              </view>
            </view>
            <view class="btn" v-if="prodItem.statusName === '未支付'" @click="handleBuy(prodItem.storeOrderId)">
              立即付款
            </view>
            <view class="btn" v-if="prodItem.statusName === '待收货'" @click="handleSh(prodItem.storeOrderId)">
              确认收货
            </view>
          </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getOrderList, takeOrder,payOrder,jsapiPayOrder } from '@/api/info'

export default {
  data() {
    return {
      headerList: [
        {
          title: '全部',
          index: 99
        },
        {
          title: '待付款',
          index: 0
        }, {
          title: '待发货',
          index: 1
        }, {
          title: '已发货',
          index: 2
        }
      ],
      storeOrderId:'',
      activeIndex: 99,
      prodList: [],
      statusMap: {
        0: '待付款',
        1: '待发货',
        2: '已发货',
      }
    };
  },
  computed: {

  },
  watch: {
    activeIndex: {
      handler(val) {
        const params = {
          pageSize: 99,
          pageNum: 1
        }
        if (Number(val) !== 99) {
          params.status = val
        }
        getOrderList(params).then(res => {
          this.prodList = res.rows
        })
      }

    },
  },
  created() {
    // 不再直接赋值，而是通过 $nextTick 确保 DOM 更新后再处理
    this.$nextTick(() => {
      this.activeIndex = this.$mp.query.type || 99; // 提供默认值以防 undefined
    });
  },
  methods: {
     // data为网页端接口请求参数列表
     onBridgeReady(data) {
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
    handleSh(storeOrderId) {
      takeOrder({
        storeOrderId
      }).then(res => {
        uni.$u.toast('收货成功');
        getOrderList({
          status:2
        }).then(res => {
          this.prodList = res.rows
        })
      })
    },
    handleBuy(storeOrderId) {
      let that = this
      if ((/micromessenger/.test(navigator.userAgent.toLowerCase()))) {
            // 带着orderId跳转到支付页逻辑
            console.log('微信浏览器');
            this.storeOrderId = storeOrderId
            jsapiPayOrder(storeOrderId).then(e => {
              console.log(e.data);
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
            payOrder(storeOrderId).then(e => {
              let redirect_url = e.data.mwebUrl + '&redirect_url=' + encodeURIComponent('https://jinriyouli.cn/yw/pay-result/index?storeOrderId='+storeOrderId);
              console.log(redirect_url, document.referrer, 999);
              window.location.href = redirect_url
            })
          }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 15px 16px;
  background: #F4F3F2;
  height: 100vh;

  .headerList {
    display: flex;
    align-items: center;

    .headerItem {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999999;
      font-size: 16px;
    }

    .activeIndex {
      color: #222222;
      font-size: 18px;
    }
  }

  .prodList {
    margin-top: 20px;

    .prodView {
      padding: 12px;
      border-radius: 10px;
      background-color: #fff;
      margin-bottom: 16px;
      .skuItem{
        margin-bottom: 10px;
      }

      .jsTabbar {

        width: 100%;
        padding-top: 35px;
        display: flex;
        box-sizing: border-box;
        align-items: center;
        background-color: #fff;

        .tip {
          color: rgba(177, 119, 26, .6);
          font-size: 14px;
          font-weight: 500;
        }

        .checkedAllTxt {
          margin-left: 12px;
          color: #462906;
          font-size: 14px;
        }

        .info {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: 13px;

          .info1 {

            color: #666666;
            font-size: 16px;
            font-weight: 500;
            margin-right: 10px;

          }

          .info2 {
            display: flex;
            align-items: center;



            .num {
              color: #B1771A;
              font-size: 18px;
              font-weight: 500;
              font-family: Source Han Serif CN-SemiBold;
              letter-spacing: -1px;
            }
          }
        }

        .btn {
          padding: 5px 10px;
          border-radius: 6px;
          background-color: #EF432A;
          color: #fff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .prod {

        display: flex;



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
  }
}
</style>
