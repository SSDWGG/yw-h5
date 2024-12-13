<template>
  <view class="container">
  <view class="flex">
    <view class="userBg">
      <image src="../../static/my/grzx.png" class="infoBg"></image>
    </view>
    <view class="infoCon">
      <image :src="!!userInfor.avatar ? location.locatioUrl + userInfor.avatar " class="tx">
      </image>
      <view class="myinfo">
        <view class="wdxx">
          <text class="name">{{ userInfor.nickName || "用户" }}</text>
          <text><u-icon name="edit-pen" class="edit"></u-icon></text>
        </view>
        <view class="id">ID:{{ userInfor.userId || "00001" }}</view>
        <view style="margin-top:14rpx" v-if="userInfor.userTypeEnum == '吸毒人员'">
          <u-button size="mini"
            :type="userInfor.riskLevel == 'GFX' ? 'error' : userInfor.riskLevel == 'ZFX' ? 'warning' : 'primary'">
            {{ userInfor.riskLevel == 'GFX' ? '高风险' : userInfor.riskLevel == 'ZFX' ? '中风险' : '低风险' }}
          </u-button>
        </view>
      </view>
    </view>
  </view>
    
    <Tabbar current="我的"></Tabbar>
  </view>
</template>
<script>
import Tabbar from '@/components/Tabbar'
import { getUserByid } from '@/api/montageApi'
import location from '@/utils/locationUrl'


export default {
  components: {
    Tabbar
  },
  data() {
    return {
      show: 1,
      userInfor: {},
      isTab: true,
      location
    };
  },
  onLoad() {
    this.userInfor = uni.getStorageSync("userInfor");
    if (this.userInfor.userTypeEnum == '吸毒人员') {
      this.getXdry()
    }
  },
  methods: {
    loginOut() {
      this.$store.dispatch('user/loginOut', this.form)
    },
    getXdry() {
      getUserByid(this.userInfor.userId).then(res => {
        if (res.code == 200) {
          this.$set(this.userInfor, 'riskLevel', res.data.riskLevel)
        }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 0rpx 30rpx 0 30rpx;
  background: #f9fafa;
}

.flex{
  display: flex;
  align-items: center;
  justify-content: center;
}
.userBg {
  position: relative;
  background: url('../../static/my/grzx.png') no-repeat;
  height: 286rpx;
  width: 100%;
  .infoBg {
      width: 100%;
      height: 286rpx;
}
}
.infoCon {
  position: absolute;
  // top: 30rpx;
  // left: 284rpx;
  text-align: center;
  .tx {
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 10rpx;
    border-radius: 120rpx;
  }

  .myinfo {
    .wdxx {
      display: flex;
      justify-content: center;
      margin-bottom: 10rpx;
      align-items: center;

      // margin-right: 8rpx;
      .name {
        font-size: 32rpx;
        font-weight: bold;
        text-align: left;
        color: #000000;
      }

      .edit {
        color: #333333;
        width: 20rpx;
        height: 20rpx;
      }
    }

    .id {
      color: #000000;
      opacity: 0.5;
      font-size: 24rpx;
    }
  }
}

.infoList {
  position: relative;
  width: 670rpx;
  // height: 235.99rpx;
  margin: 20rpx auto;
  background: #ffffff;
  border-radius: 32rpx;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);

  .conItem {
    width: 574rpx;
    margin: 0 20rpx;
    padding: 20rpx 0rpx;
    border-bottom: 1px solid rgba(151, 151, 151, 0.16);
    display: flex;
    align-items: center;
    line-height: 60rpx;

    .hb {
      position: absolute;
      z-index: 10;
      top: 132rpx;
      left: 44rpx;
    }

    .tz {
      margin-left: 2rpx;
      width: 38rpx;
      height: 38rpx;
      margin-right: 8rpx;
    }

    .icon,
    .rw {
      width: 38rpx;
      height: 38rpx;
      margin-right: 8rpx;
      margin-left: 4rpx;
    }

    .rw {
      width: 34rpx;
      height: 34rpx;
    }
  }
}</style>