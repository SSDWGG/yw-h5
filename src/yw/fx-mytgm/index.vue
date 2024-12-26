<template>
  <view class="container">
    <view class="bgcolor"/> 
    <img class="titleBg" src="@/static/yw/shareBg.png">
    <view class="block">
      <view class="avatar">
        <img class="avatarImg" :src="userInfo.avatar">
      </view>
      <view class="line1">
        {{ userInfo.username }}
      </view>
      <view class="line2">
        {{ userInfo.phone }}
      </view>
      <view class="line3">
        <img class="qrCode" :src="userInfo.avatar">
      </view>
      <view class="line4">
        您的推荐码为
        <view class="tip">
          {{ userInfo.tjm }}

        </view>
      </view>

    </view>


    <view class="bottom">
      <view class="item" v-for="(item, index) in bottomList" :key="index">
        <img class="icon" :src="item.icon">
        <view class="tip" >
          {{ item.tip }}
        </view>
      </view>
    </view>

  </view>
</template>

<script>

export default {

  data() {
    return {

      userInfo: {
        avatar: require("@/static/yw/prodDetail.png"),
        phone: 13333333333,
        username: 'aa啊啊凡凡',
        tjm: '56648JHIKLKO'
      },
      bottomList: [
        {
          tip: '微信好友',
          icon: require("@/static/yw/wechat.png")
        }, {
          tip: '朋友圈',
          icon: require("@/static/yw/pyq.png")
        }, {
          tip: 'QQ好友',
          icon: require("@/static/yw/qq.png")
        }
      ]

    };
  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding: 0 42px;
  padding-top: 120px;
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
    top: -100px;
    left: 0;
    z-index: -1;
  }
  .block {
    background-color: #FFFFFF;
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding-top: 51px;
    position: relative;

    .avatar {
      width: 86px;
      height: 86px;
      border: 3px solid #fff;
      border-radius: 50%;
      position: absolute;
      top: -45px;
      left: 50%;
      transform: translate(-50%, 0);

      .avatarImg {
        width: 86px;
        height: 86px;
        border-radius: 50%;

      }
    }

    .line1 {
      color: #000000;
      font-weight: 600;
      font-size: 14px;
    }

    .line2 {
      color: #999;
      font-weight: 400;
      font-size: 12px;
      margin-bottom: 4px;
      margin-bottom: 30px;
    }

    .line3 {
      .qrCode {
        width: 140px;
        height: 140px;
      }
    }

    .line4 {
      margin-top: 50px;
      background-color: #FBFBFB;
      padding: 8px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: rgba(70, 41, 6, .35);
      font-size: 14px;
      font-weight: 500;
      width: 100%;
      border-radius: 0 0 20px 20px;

      .tip {
        color: #462906;
        font-size: 18px;
        font-weight: 600;
        margin-top: 2px;
      }
    }


  }

  .bottom {
    margin-top: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .icon {
        width: 47px;
        height: 47px;
        border-radius: 50%;
        margin-bottom: 8px;
      }

      .tip {
        font-size: 14px;
        color: #000000;
      }
    }
  }


}
</style>
