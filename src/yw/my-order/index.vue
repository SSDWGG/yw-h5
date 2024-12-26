<template>
  <view class="container">
    <!-- header -->
    <view class="headerList">
      <view :class="[activeIndex === index ? 'activeIndex' : '']" class="headerItem" v-for="(item, index) in headerList"
        :key="index" @click="() => {
          activeIndex = index
        }">
        {{ item.title }}
      </view>
    </view>

    <!-- 商品卡片 -->
    <view class="prodList">
      <view class="prodView" v-for="(item, index) in prodList" :key="index">
        <view class="prod" >
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
        <view class="jsTabbar">
          <view class="tip" >
            待付款
          </view>

          <view class="info">
            <view class="info1">
              实付款
            </view>
            <view class="info2">
              
              <view class="num" >
                ￥9999
              </view>

            </view>
          </view>
          <view class="btn">
            立即付款
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      headerList: [
        {
          title: '全部',
          index: 0
        },
        {
          title: '待付款',
          index: 1
        }, {
          title: '待发货',
          index: 2
        }, {
          title: '已发货',
          index: 3
        }
      ],
      activeIndex: 0,
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
    };
  },

  methods: {

    handleBuy() {
      uni.navigateTo({ url: '/yw/prod-detail/index' })
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

      .jsTabbar {

        width: 100%;
        padding-top: 35px;
        display: flex;
        box-sizing: border-box;
        align-items: center;
        background-color: #fff;
        .tip{
          color: rgba(177, 119, 26,.6);
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
  }
}
</style>
