<template>
  <view class="container">



    <!-- 商品卡片 -->
    <view class="prodList">
      <view class="prod" v-for="(item, index) in prodList" :key="index">
        <u-checkbox-group v-model="item.checkedValArr" name="prodCheckbox">
          <u-checkbox name="prodCheck" :checked="item.checked" size="20" shape="circle"
            activeColor="#EF432A"></u-checkbox>
        </u-checkbox-group>
        <img :src="item.prodImage" class="prodImage" @click="handleBuy" />

        <view class="prodinfo" @click="handleBuy">
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

    <!-- 结算栏 -->
    <view class="jsTabbar">
      <u-checkbox-group v-model="checkedAll" @change="handleChangeCheckedAll" name="jsCheckboxGroup">
        <u-checkbox size="20" shape="circle" activeColor="#EF432A" name="jsCheckbox" />
      </u-checkbox-group>
      <view class="checkedAllTxt">
        全选
      </view>
      <view class="info">
        <view class="info1">
          已选1件
        </view>
        <view class="info2">
          <view class="hj">
            合计:
          </view>
          <view class="num">
            ￥9999
          </view>

        </view>
      </view>
      <view class="btn">
        结算
      </view>
    </view>

    <Tabbar current="购物车"></Tabbar>
  </view>
</template>
<script>
import Tabbar from "@/components/Tabbar.vue";
import { getCarList } from '@/api/info'

export default {
  components: {
    Tabbar
  },
  data() {
    return {
      prodList: [{
        title: '精品燕窝精品燕窝商品标题',
        price1: 55644,
        price2: 55644,
        prodImage: require("@/static/yw/prodDetail.png")
      }],
      checkedAll: []
    }
  },
  onShow(){
    getCarList().then((res) => {
      console.log(res);
      // this.userInfo = res.data
    })
  },
  methods: {
    handleBuy() {
      uni.navigateTo({ url: '/yw/prod-detail/index' })
    },
    handleChangeCheckedAll(arr) {
      if (arr.length > 0) {
        this.prodList.forEach(item => {
          item.checked = true
        })
      } else {
        this.prodList.forEach(item => {
          item.checked = false
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
  padding: 10px;
  background-color: #F4F3F2;
  box-sizing: border-box;
  position: relative;
  padding-bottom: calc(50px + env(safe-area-inset-bottom));

  .jsTabbar {
    position: fixed;
    bottom: calc(50px + env(safe-area-inset-bottom));
    left: 0;
    width: 100%;
    padding: 12px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    background-color: #fff;

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
      margin-right: 16px;

      .info1 {
        color: rgba(34, 34, 34, .6);
        font-size: 12px;
        margin-right: 10px;

      }

      .info2 {
        display: flex;
        align-items: center;

        .hj {
          color: #B1771A;
          font-size: 12px;
        }

        .num {
          color: #B1771A;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }

    .btn {
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
  }

  .prodList {
    .prod {
      padding: 11px 10px;
      display: flex;
      border-radius: 10px;
      background-color: #fff;
      margin-bottom: 10px;

      .prodImage {
        width: 107px;
        height: 107px;
        margin-right: 16px;
        margin-left: 4px;
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
            color: rgba(70, 41, 6,.3);
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