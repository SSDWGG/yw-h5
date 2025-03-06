<template>
  <view class="container">
    <view class="bgcolor" />
    <img class="titleBg" src="@/static/yw/shareBg.png">
    <view class="block">
      <view class="avatar">
        <img  class="avatarImg"  :src="!!userInfo.avatar ? userInfo.avatar : defaultImg">
      </view>
      <view class="line1">
        {{ userInfo.nikeName }}
      </view>
      <view class="line2">
        {{ userInfo.phone }}
      </view>
      <view class="line3">
        <img class="qrCode" :src="!!imgUrl ? imgUrl : defaultImg
          ">
      </view>
      <view class="line4">
        您的推荐码为
        <view class="tip">
          {{ userInfo.spreadCode }}

        </view>
      </view>

    </view>


    <view class="bottom">
      <view class="item" v-for="(item, index) in bottomList" :key="index" @click="exportImage(imgUrl)">
        <img class="icon" :src="item.icon">
        <view class="tip">
          {{ item.tip }}
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import { getQR, getYwUserInfo } from '@/api/info'

export default {

  data() {
    return {
      userInfo: {},
      imgUrl: '',
      defaultImg: require("@/static/yw/prodDetail.png"),
      bottomList: [
        // {
        //   tip: '微信好友',
        //   icon: require("@/static/yw/wechat.png")
        // }, {
        //   tip: '朋友圈',
        //   icon: require("@/static/yw/pyq.png")
        // }, {
        //   tip: 'QQ好友',
        //   icon: require("@/static/yw/qq.png")
        // }
        {
          tip: '保存图片',
          icon: require("@/static/yw/downloadIcon.jpg")
        }
        
      ]

    };
  },
  created() {
    getQR().then((res) => {
      this.imgUrl = res.data.imgBase64
    })
    getYwUserInfo().then((res) => {
      this.userInfo = res.data
    })
  },
  methods: {
    exportImage(base64str) {
      // 将base64格式的图片转换成Blob对象
      var arr = base64str.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      // 将Blob对象转换成文件并下载到本地
      var blob = new Blob([u8arr], {
        type: mime
      });
      var a = document.createElement('a');
      a.download = `金义源${this.userInfo.nikeName}的邀请码`;
      a.href = URL.createObjectURL(blob);
      a.click();
    },
  }
}
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
      font-size: 16px;
    }

    .line2 {
      color: #999;
      font-weight: 400;
      font-size: 12px;
      margin-bottom: 4px;
      // margin-bottom: 30px;
    }

    .line3 {
      .qrCode {
        width: 240px;
        height: 240px;
      }
    }

    .line4 {
      margin-top: 0px;
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
    justify-content: center;

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
