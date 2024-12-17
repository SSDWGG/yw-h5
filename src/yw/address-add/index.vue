<template>
  <view class="container">

    <view class="addressList" v-for="(item,index) in addressList" :key="index">
      
    </view>
    <view class="emptyAddress" v-if="addressList.length===0">
      <u-empty mode="address">
      </u-empty>
      <view class="btn" @click="openPop">
        新建地址
      </view>
    </view>


    <u-popup :show="popShow" :catch-move="false" mode="bottom" :round="10" closeOnClickOverlay>
      <view class="popContent" hover-class="none" hover-stop-propagation="false">


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
              <u-input border="none" v-model="addressObg.mobile" placeholder="请填写手机号" />
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

export default {

  data() {
    return {
      addressObg: {
        receiver: '',
        mobile: '',
        addr: '',

      },
      addressList: [
      // {
      //   receiver: 'aaaawgg',
      //   mobile: '13333333333',
      //   addr: '浙江省杭州市西湖区蚂蚁大厦1502',
      // }
      ],
      popShow: false,
      bannerlist: [require("@/static/yw/swiper/hb1.png"), require("@/static/yw/swiper/hb1.png")],
    };
  },

  methods: {
    openPop() {
      this.popShow = true
      // console.log('close');
    },
    closePop() {
      this.popShow = false
      // console.log('close');
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 15px 16px;
  background: #fff;
  height: 100vh;

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
