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

    <Tabbar current="购物车"></Tabbar>
  </view>
</template>
<script>
import Tabbar from "@/components/Tabbar.vue";
import Card from '@/components/Card.vue'
export default {
  components: {
    Card,
    Tabbar
  },
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
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  padding: 10px;
  background-color: #F4F3F2;
  box-sizing: border-box;
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
</style>