<template>
  <view class="container">

    <view class="addressList" v-if="addressList.length > 0">
      <view class="addressItem" v-for="(item, index) in addressList" :key="index" @click="selAddrToOrder(item)" >
        <view class="info">
          <view class="line1">
            <view class="name">
              {{ item.realName }}
            </view>
            <view class="phone">
              {{ item.phone }}
            </view>
          </view>
          <view class="line2">
            {{ item.district + item.detail }}
          </view>
        </view>
        <view class="edit" @click="toAddAdress(item.userAddressId)">

          <u-icon name="edit-pen" color="#999999" size="24" class="icon" />

        </view>
      </view>
      <view class="addView" @click="toAddAdress()">
        <u-icon name="plus-circle" color="#C89761" size="20" class="icon" />
        添加地址
      </view>

    </view>



    <view class="emptyAddress" v-else>
      <u-empty mode="address">
      </u-empty>
      <view class="btn" @click="toAddAdress()">
        新建地址
      </view>
    </view>


    <u-popup :show="popShow" :catch-move="false" mode="bottom" :round="10" closeOnClickOverlay>
      <view class="popContent">


        <view class="header">
          <view class="head">新增地址</view>
          <view class="add-close" @tap="closePop">

            <u-icon name="close" size="18">
              ></u-icon>
          </view>
        </view>
        <view class="layout">
          <view class="contents">
            <div class="cell">
              <view class="label">收货人</view>
              <u-input border="none" v-model="addressObg.receiver" placeholder="姓名" />
            </div>
            <div class="cell">
              <view class="label">联系方式</view>
              <u-input border="none" v-model="addressObg.phone" placeholder="请填写手机号" />
            </div>
            <div class="cell">
              <view class="label">详细地址</view>
              <u-input border="none" v-model="addressObg.addr" placeholder="请填写详细地址" />
            </div>
          </view>
        </view>
        <view class="add-footer">
          <u-button type="primary">保存地址</u-button>
        </view>
      </view>
    </u-popup>

  </view>
</template>

<script>
import { getAddressList } from '@/api/info'

export default {

  data() {
    return {
      addressObg: {
        receiver: '',
        phone: '',
        addr: '',
      },
      addressList: [],
      popShow: false,
    };
  },
  created() {
    getAddressList().then((res) => {
      this.addressList = res.data
    })
  },
  methods: {
    openPop() {
      this.popShow = true
    },
    closePop() {
      this.popShow = false
    },
    toAddAdress(userAddressId) {
      if (!!userAddressId) {
        uni.navigateTo({ url: `/yw/address-add/index?userAddressId=${userAddressId}` })

      } else {
        uni.navigateTo({ url: `/yw/address-add/index` })

      }
    },
    selAddrToOrder(item){
      if (!this.$mp.query.from) {
      const pages = getCurrentPages();// 当前页面
      const prevPage = pages[pages.length - 2];// 上一页面
      console.log(pages,prevPage);
      prevPage.item = item
      prevPage.selAddress = 'yes'
      // prevPage.setData({// 直接给上移页面赋值
      //   item: item,
      //   selAddress: 'yes'
      // });
      uni.navigateBack({// 返回
        delta: 1
      });
    }
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 15px 16px;
  background: #F4F3F2;
  height: 100vh;

  .addressList {
    .addressItem {
      background: #fff;
      padding: 12px;
      border-radius: 10px;
      display: flex;
      margin-bottom: 12px;

      .info {
        flex: 1;


        .line1 {
          color: #222222;
          font-size: 16px;
          display: flex;
          margin-bottom: 13px;
          font-weight: 500;

          .name {
            margin-right: 24px;
          }
        }

        .line2 {
          color: #999999;
          font-size: 12px;
        }
      }

      .edit {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .addView {
      margin-top: 14px;
      display: flex;
      color: #C89761;
      font-size: 14px;
      font-weight: 500;

      .icon {
        margin-right: 8px;
      }
    }
  }

  .emptyAddress {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .btn {
      margin-top: 58px;
      padding: 11px 58px;
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

  .popContent {
    height: 463px;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .header {
      font-size: 16px;
      height: 57px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 18px;
      position: relative;
      background-color: #fff;

      .head {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 57px;
        font-weight: 500;
        font-size: 16px;
      }

      .add-close {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }

    .layout {
      overflow: scroll;
      flex: 1;
    }

    .contents {
      padding: 0 20px;
      color: #333;

      .cell {
        display: flex;
        height: 43px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #F5F5F9;

        .label {
          width: 100px;
          font-size: 14px;
        }

        .nut-input {
          padding: 0px;
          flex: 1;
          border: none;
          font-size: 14px;
        }

        .nut-input-box {
          input {
            font-weight: 600;
          }

          .input-placeholder {
            font-weight: normal;
          }
        }

        .areaValue {
          flex: 1;
          font-weight: 600;
          font-size: 14px;
          text-align: left;
        }
      }
    }

    .add-footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 50px;
      background-color: #fff;
      padding-bottom: calc(10px + env(safe-area-inset-bottom));
      display: flex;
      justify-content: center;
      align-items: flex-end;
      box-shadow: 0px -5px 8px 0px rgba(237, 237, 237, 0.5);

      // height: 50px;
      .u-button {
        height: 40px;
        width: 320px;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }


}
</style>
