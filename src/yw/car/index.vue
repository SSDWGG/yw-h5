<template>
  <view class="container">
    <!-- 商品卡片 -->
    <u-swipe-action class="prodList">
      <u-swipe-action-item @click="clickSwipe" class="prodItem" v-for="(item, index) in prodList"
        :key="item.storeCartId" :name="item.storeCartId" :options="options1">
        <view class="prod" v-if="!!item.product">
          <!-- <u-checkbox-group v-model="item.checkedValArr" name="prodCheckbox"> -->
          <!-- <u-checkbox name="prodCheck" :checked="item.checked" size="20" shape="circle"
              activeColor="#EF432A"></u-checkbox> -->
          <!-- </u-checkbox-group> -->

          <view class="myCheckDiv" @click="item.checked = !item.checked">
            <view class="myCheck" v-if="!item.checked" />
            <u-icon v-else name="checkmark-circle-fill" color="#EF432A" size="24" class="icon" />
          </view>
          <img :src="item.product.imageUrl" class="prodImage" @click="handleToDetail(item.product.storeProductId)" />

          <view class="prodinfo" @click="handleToDetail(item.product.storeProductId)">
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
                x{{ item.cartNum }}

              </view>

            </view>
          </view>
        </view>
      </u-swipe-action-item>
    </u-swipe-action>
    <view class="empty" v-if="prodList.length===0">
      <img src="@/static/yw/emptyCar.png" />
      <view class="txt">
        购物车空空如也~
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
          已选{{ num }}件
        </view>
        <view class="info2">
          <view class="hj">
            合计:
          </view>
          <view class="num">
            ￥{{ price }}
          </view>

        </view>
      </view>
      <view class="btn" @click="handleBuy">
        结算
      </view>
    </view>

    <Tabbar current="购物车"></Tabbar>
  </view>
</template>
<script>
import Tabbar from "@/components/Tabbar.vue";
import { getCarList, deleteToCar } from '@/api/info'

export default {
  components: {
    Tabbar
  },
  computed: {
    num() {
      return this.prodList.filter(item => !!item.checked).length
    },
    price() {
      return this.prodList.filter(item => !!item.checked).reduce((prev, curr) => prev + curr.product.price*curr.cartNum, 0)
    }
  },
  data() {
    return {
      prodList: [],
      checkedAll: [],
      options1: [{
        text: '删除'
      }]
    }
  },
  onShow() {
    this.initList()
  },
  methods: {
    handleBuy(){
      const list = this.prodList.filter(item => !!item.checked)
      if(list.length===0){
        uni.$u.toast('请先选择商品')
      }else{
        list.forEach(item=>{
          item.product.count = item.cartNum
        })
      uni.setStorageSync('orderInfoArr', list.map(item=>item.product))
      // storeCartId
      uni.navigateTo({ url: '/yw/submit/index?car=car' })
      }
      
     
    },
    initList() {
      getCarList().then((res) => {
        this.prodList = res.data
        this.prodList.forEach(item => {
          this.$set(item, 'checked', false)
        })
      })
    },
    clickSwipe(params) {
      deleteToCar(params.name).then(res => {
        uni.$u.toast('删除成功')
        this.initList()
      })
    },
    handleToDetail(storeProductId) {
      uni.navigateTo({ url: `/yw/prod-detail/index?storeProductId=${storeProductId}` })
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
  .empty{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 150px;
    img{
      width: 130px;
      height: 130px;
    }
    .txt{
      color: #C5C5C5;
      padding-top: 14px;
    }
  }

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
    ::v-deep .u-swipe-action-item__content {
      background-color: #F4F3F2;
      padding: 0;
    }

    .prodItem {
      margin-bottom: 10px;

      .prod {
        width: 100%;
        padding: 11px 10px;
        display: flex;
        border-radius: 10px;
        background-color: #fff;
        box-sizing: border-box;

        .myCheckDiv {
          height: 107px;
          display: flex;
          align-items: center;
          justify-content: center;

          .myCheck {
            border: 2px solid #E2E2E2;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }


        .prodImage {
          width: 107px;
          height: 107px;
          margin-right: 16px;
          margin-left: 10px;
          box-sizing: border-box;
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
              color: rgba(70, 41, 6, .3);
              font-size: 12px;
              font-weight: SemiBold;
              text-decoration: line-through;
              font-weight: 500;

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