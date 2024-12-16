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
      <view class="prod" v-for="(item, index) in prodList" :key="index">
        <img :src="item.prodImage" class="prodImage" />
        <view class="prodinfo" hover-class="none" hover-stop-propagation="false">
          <view class="title">
            {{ item.title }}
          </view>
          <view class="info">
            <view class="price1">
              ￥{{ item.price1 }}
            </view>
            <view class="price2">
              ￥{{ item.price2 }}
            </view>
            <view class="buy">
              <u-button color="linear-gradient(to bottom, #F9694C, #F22020)" text="去购买" class="btn"
                @click="handleBuy"></u-button>

            </view>

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
          title: '综合',
          index: 0
        },
        {
          title: '销量',
          index: 0
        }, {
          title: '价格',
          index: 0
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
  background: #fff;
  height: 100%;

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
    margin-top: 15px;
    .prod {
      padding: 16px 0;
      border-bottom: 1px solid rgba(70, 41, 6, .1);
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
          font-weight: Medium;
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
            font-size: 14px;
            font-weight: SemiBold;
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
              width: 66px;
              height: 28px;
            }

          }
        }
      }
    }
  }
}
</style>
