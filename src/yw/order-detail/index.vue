<template>
  <view class="container">

    <view class="bgcolor" />
    <img class="titleBg" src="@/static/yw/order/bg.png">

    <view class="allprice">
      <view class="txt">
        {{ this.statusMap[this.status].statusName }}
      </view>
      <view class="num">
        {{ this.statusMap[this.status].txt }}
      </view>
    </view>

    <!-- 商品卡片 -->
    <view class="prodList">
      <view class="prod" v-for="(item, index) in prodList" :key="index">
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
              <!-- x{{ item.product.count }} -->
              x 1

            </view>

          </view>
        </view>
      </view>

      <!-- 分割线 -->
      <view class="line" />
      <view class="infoDiv">
        <view class="title">商品总额</view>
        <view class="content">￥{{ info.totalPrice }}</view>
      </view>
      <view class="infoDiv">
        <view class="title">运费</view>
        <view class="content">
          <view class="title2" v-if="this.status === '99'">买家自提</view>
          ￥{{ info.totalPostage }}
        </view>
      </view>
      <view class="line2" />
      <view class="infoDiv2">
        <view class="content2">
          <view class="title">实付金额</view>
          ￥{{ info.payPrice }}
        </view>
      </view>
    </view>

    <!-- 自提地址 -->
    <view class="address2">
      <view class="line1">
        <img class="icon" src="@/static/yw/address.png" alt="">
        <view class="content">
          提货地址
        </view>
      </view>

      <view class="detail">
        宁国市北园路津河小区1幢20号门面
      </view>
    </view>

    <!-- 订单信息 -->
    <view class="orderInfoDetail">
      <view class="line1">
        订单编号 : {{ info.orderId }}
        <view class="copy" @click="getDetail(info.orderId)">
          复制
        </view>
      </view>
      <view class="line2">
        下单时间 : {{ this.info.createTime }}
      </view>
    </view>

    <!-- bottom -->

    <view class="bottom" v-if="status !== '-2'" >
      <view class="btn2" >
        申请退款
      </view>
      <view class="btn1" @click="handleBuy(info.cartInfoList[0].product.storeProductId)">
        再次购买
      </view>
    </view>
  </view>
</template>

<script>
import { orderDetail } from '@/api/info'

export default {

  data() {
    return {
      info: {},
      prodList: [],
      status: '99',
      // -1 : 申请退款 -2 : 退货成功 0：待发货；1：待收货；2：已收货；3：已完成；-1：已退款
      statusMap: {
        '99': {
          statusName: '待提货',
          txt: '已付款，请于指定地点提货哦！'
        },
        "-1": {
          statusName: '售后中',
          txt: '订单已申请退款，请耐心等待商家处理'
        },
        '-1': {
          statusName: '已取消',
          txt: '订单已经申请退款'
        },
        '-2': {
          statusName: '退款成功',
          txt: '货款已经原路退回'
        },
        '0': {
          statusName: '待发货',
          txt: '已付款，请耐心等待发货哦！'
        },
        '1': {
          statusName: '已发货',
          txt: '商品已经发货，请耐心等待哦！'
        }
      }
    };
  },
  created() {
    if (!!this.$mp.query.storeOrderId) {
      orderDetail(this.$mp.query.storeOrderId).then(res => {
        console.log(res);
        this.info = res.data
        this.prodList = res.data.cartInfoList
        if (res.data.deliveryType === "1") {
          this.status = '99'
        } else {
          this.status = res.data.status + ''
          console.log(this.status);

        }
      })
    }
  },
  methods: {
    getDetail(info) {
      uni.setClipboardData({
        data: info,//要被复制的内容
        success: () => {//复制成功的回调函数
          uni.showToast({//提示
            title: '复制成功'
          })
        }
      });
      // uni.showModal({
      //   content: info,//模板中提示的内容
      //   confirmText: '复制内容',
      //   success: (res) => {//点击复制内容的后调函数
      //     if (res.confirm) {
      //       let result
      //       // #ifndef H5
      //       //uni.setClipboardData方法就是讲内容复制到粘贴板
      //       uni.setClipboardData({
      //         data: info,//要被复制的内容
      //         success: () => {//复制成功的回调函数
      //           uni.showToast({//提示
      //             title: '复制成功'
      //           })
      //         }
      //       });
      //       // #endif

      //       // #ifdef H5 
      //       let textarea = document.createElement("textarea")
      //       textarea.value = info
      //       textarea.readOnly = "readOnly"
      //       document.body.appendChild(textarea)
      //       textarea.select() // 选中文本内容
      //       textarea.setSelectionRange(0, info.length)
      //       uni.showToast({//提示
      //         title: '复制成功'
      //       })
      //       result = document.execCommand("copy")
      //       textarea.remove()
      //       // #endif
      //     } else {
      //       console.log('取消')
      //     }
      //   }
      // });
    },
    handleBuy(storeProductId) {
      uni.navigateTo({ url: `/yw/prod-detail/index?storeProductId=${storeProductId}` })
    },

  },
};
</script>

<style lang="scss" scoped>
.container {
  .bgcolor {
    background: #F4F3F2;
    z-index: -2;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }

  .titleBg {
    width: 100vw;
    position: absolute;
    top: 0px;
    left: 0;
    z-index: -1;
  }

  .allprice {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 35px 22px;
    padding-bottom: 0;
    color: #fff;
    flex-direction: column;

    .txt {
      font-size: 24px;
      font-weight: 400;
    }

    .num {
      margin-top: 8px;
      font-size: 14px;
      font-weight: 600;
    }
  }

  .prodList {
    margin: 14px 10px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;

    .prod {
      padding: 11px;
      display: flex;
      // margin-top: 10px;

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

    .line {
      border-top: 1rpx solid rgba(70, 41, 6, .1);
      width: 332px;
      margin-top: 16px;
      margin-bottom: 8px;
    }

    .line2 {
      border-top: 1rpx solid rgba(70, 41, 6, .1);
      width: 332px;
      margin-bottom: 12px;

    }


    .infoDiv {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 332px;
      margin-bottom: 14px;

      .title {
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #666666;
        line-height: 16px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .title2 {
        margin-right: 10px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #666666;
        line-height: 16px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .content {
        font-family: PingFang SC, PingFang SC;
        font-weight: 800;
        font-size: 16px;
        color: #462906;
        line-height: 19px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        display: flex;
      }

    }

    .infoDiv2 {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 332px;
      margin-bottom: 14px;

      .content2 {
        font-family: PingFang SC, PingFang SC;
        font-weight: 800;
        font-size: 16px;
        color: #462906;
        line-height: 19px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #B1771A;

        .title {
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 14px;
          color: #666666;
          line-height: 16px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          margin-right: 10px;
        }
      }
    }
  }

  .orderInfoDetail {
    background-color: #fff;
    padding: 15px 12px;
    border-radius: 10px;
    margin: 16px 10px;

    .line1 {
      display: flex;
      align-items: center;

      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #999999;
      line-height: 16px;
      text-align: left;
      font-style: normal;

      .copy {
        width: 35px;
        height: 20px;
        background: #F1F1F1;
        border-radius: 4px 4px 4px 4px;
        margin-left: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #333;


      }
    }

    .line2 {
      display: flex;
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #999999;
      line-height: 16px;
      text-align: left;
      font-style: normal;
      margin-top: 12px;
    }
  }

  .address2 {
    background-color: #fff;
    padding: 15px 12px;
    border-radius: 10px;

    margin: 16px 10px;

    .line1 {
      display: flex;
      font-weight: 500;
    }

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
      font-weight: 500;
    }

    .detail {
      color: #666666;
      font-size: 14px;
      font-weight: 500;
      margin-top: 14px;
    }
  }
  .bottom{
    position: fixed;
    bottom: 0;
    padding: 12px;

    padding-bottom: calc(10px + env(safe-area-inset-bottom));
    left: 0;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-end;
    background-color: #fff;
    .btn1 {
      padding: 11px 34px;
      border-radius: 6px;
      background-color: #EF432A;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn2 {
      border: 1px solid #E2E2E2;
      padding: 11px 34px;
      border-radius: 6px;
      background-color: #fff;
      color: #333333;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 17px;
    }
  }
  


}
</style>
