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
        <img :src="item.imageUrl" class="prodImage" />
        <view class="prodinfo" >
          <view class="title">
            {{ item.storeName }}
          </view>
          <view class="info">
            <view class="price1">
              ￥{{ item.price }}
            </view>
            <view class="price2">
              ￥{{ item.otPrice }}
            </view>
            <view class="buy">
              <u-button color="linear-gradient(to bottom, #F9694C, #F22020)" text="去购买" class="btn"
                @click="handleBuy(item.storeProductId)"></u-button>

            </view>

          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getProdList } from '@/api/info'

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
          index: 1
        }, {
          title: '价格',
          index: 2
        }
      ],
      activeIndex: 0,
      prodList: [],
    };
  },
  created() {
    console.log(!!this.$mp.query.isVip);
    // if(!!this.$mp.query.isVip){
    //   getAddressItem(this.$mp.query.userAddressId).then(res => {
    //     this.form = res.data
    // })
    // }
    const vipParams = {isVip:1}
    getProdList(
      !!this.$mp.query.isVip?  vipParams:{}
    ).then((res)=>{
      this.prodList = res.rows
    })
  },
  methods: {

    handleBuy(storeProductId) {
      uni.navigateTo({ url: `/yw/prod-detail/index?storeProductId=${storeProductId}` })
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
