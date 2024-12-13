<template>
  <view class="container">
     <u-swiper :list="bannerlist"></u-swiper>
    <!--<view class="notice" @click="handleJump('/packPages/remind/index')">
            <view class="icon-box">
                <image src="@/static/icon/icon-notice.png" mode="scaleToFill" />
            </view>
            <view class="text-box">
                <view class="text">您有{{txhz.total}}条任务需整改</view>
                <view class="date">{{txhz.date}}</view>
            </view>
        </view> -->
    <view class="card">
      <card :isShadow="true">
        <view class="tabs">
          <view
            class="item-tab tab1"
            v-if="userType == '禁毒中队'"
            @click="handleJump('/pages/pushTask/index')"
          >
            <view class="icon"> </view>
            <text>发布任务</text>
          </view>
          <view
            class="item-tab tab2"
            v-if="userType != '吸毒人员家属'"
            @click="handleJump('/pages/todoAgency/index')"
          >
            <view class="icon">
              <u-badge :type="type" max="99" :value="value"></u-badge>
            </view>
            <view>待办事项</view>
          </view>
          <view
            class="item-tab tab3"
            v-if="userType == '禁毒中队' || userType == '地方派出所'"
            @click="handleJump('/pagesPack1/personMange/index')"
          >
            <view class="icon"> </view>
            <text>人员管理</text>
          </view>
          <view
            class="item-tab tab4"
            v-if="userType == '禁毒中队'"
            @click="handleJump('/pages/onlineOff/index')"
          >
            <view class="icon"> </view>
            <text>网上办公室</text>
          </view>
          <view
            class="item-tab tab4"
            v-if="userType == '吸毒人员'"
            @click="handleJump('/pages/onlineOff/xdrysb')"
          >
            <view class="icon"> </view>
            <text>网上办公室</text>
          </view>
          <view
            class="item-tab tab5"
            v-if="userType != '吸毒人员家属'"
            @click="handleJump('/pages/rwList/index')"
          >
            <view class="icon"> </view>
            <text>任务列表</text>
          </view>
          <view
            class="item-tab tab6"
            v-if="userType == '吸毒人员家属'"
            @click="handleJump('/pages/inquireInfo/inquireInfo')"
          >
            <view class="icon"> </view>
            <text>信息查询</text>
          </view>
          <view
            class="item-tab tab7"
            v-if="userType == '吸毒人员家属'"
            @click="handleJump('/pages/feedBack/feedBack')"
          >
            <view class="icon"> </view>
            <text>反馈信息</text>
          </view>
          <view
            class="item-tab tab8"
            v-if="userType !== '禁毒中队'"
            @click="handleJump('/pages/knowledgeList/konwList')"
          >
            <view class="jdzs"></view>
            <text>禁毒知识</text>
          </view>
        </view>
      </card>
    </view>

    <!-- <u-button @click="show = true">打开</u-button> -->
    <u-popup :show="show" mode="center">
      <view class="qdBox">
        <img src="@/static/index/pop_qd.png" class="qdBox_img" alt="" />
        <view class="qdRadio" v-if="qdzt == '未签到'" @click="signHandle">
          <view style="text-align: center">
            <view style="font-size: 34rpx">{{ nowTime }}</view>
            <view style="margin-top: 16rpx">签到</view>
          </view>
        </view>
        <view class="qdRadio" v-if="qdzt == '已签到' || qdzt == '请求中'">
          <view style="text-align: center" v-if="qdzt == '已签到'">
            <u-icon name="checkbox-mark" size="72" color="#fff"></u-icon>
          </view>
          <u-loading-icon
            size="48"
            color="#fff"
            v-if="qdzt == '请求中'"
          ></u-loading-icon>
          <view class="qdTitle" v-if="qdzt == '已签到'">签到成功</view>
        </view>
      </view>
    </u-popup>
    <Tabbar current="工作台"></Tabbar>
  </view>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue";
import Card from "@/components/Card.vue";
import { getDate } from "@/utils/index";
import { getQd ,queryQd} from "@/api/montageApi";
import amap from '@/utils/amap-wx.130.js';  
export default {
  components: {
    Card,
    Tabbar
  },
  data() {
    return {
      show: false,
      timer: null,
      nowTime: "",
      bannerlist: ["https://gayws.wuchuangroup.com:8443/prod-api/profile/upload/banner/banner2.jpg"],
      backlog: {},
      txhz: {},
      qdzt: "未签到",
      userType: "",
      type: "error",
      value: 10,
      userInfor: {},
      qdsj:'',
      amapPlugin: null,  
      key: '8af8d7e389012bf647639957b6ee4077'  // 这里填写高德开放平台上申请的key
    };
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onShow(){
    this.userInfor = uni.getStorageSync("userInfor");
    this.userType = uni.getStorageSync("userType");
    this.getData()
  },
  onLoad() {
    this.userInfor = uni.getStorageSync("userInfor");
    this.userType = uni.getStorageSync("userType");
    this.amapPlugin = new amap.AMapWX({  
      key: this.key  
    });  
     
    if (this.userType == "禁毒中队") {
      uni.setTabBarItem({
        index: 0,
        visible: true,
      });
    } else if (this.userType == "地方派出所" || this.userType == "吸毒人员") {
      uni.setTabBarItem({
        index: 0,
        visible: false,
        success: () => {
        },
      });
    
    }
    if (this.userType == "吸毒人员家属") {
      uni.setTabBarItem({
        index: 0,
        visible: false,
      });
      uni.setTabBarItem({
        index: 2,
        visible: true,
      });
    }
    this.formatDate();
    // this.initData()
    this.getData();
    
    if ( this.userType==='吸毒人员') {
      this.checkQd()
    }
  },
  methods: {
    getData() {
      
      let params = {
        pageSize: 10,
        pageNum: 1,
        taskStatus: 'CREATE',
        receiverUserid:this.userInfor.userId
      };
      if (this.userInfor.userTypeEnum != "禁毒中队") {
        params.receiverUserid = this.userInfor.userId;
      }
      this.$service.pushTask.getTaskList(params).then((res) => {
        this.value = res.data.totalElements;
      });
    },
    async initData() {
      this.getTxhz();
    },
    async getTxhz() {
      const { data } = await this.$service.index.getTxhzInfo();
      let date = getDate();
      let count = 0;
      Object.keys(data).map((item) => {
        count += data[item];
      });
      this.txhz = {
        total: count,
        date: date.year + "-" + date.month + "-" + date.day,
      };
    },
    handleJump(url) {
      uni.navigateTo({
        url: url,
      });
    },
    signHandle() {
      console.log('0202');
      console.log(this.amapPlugin);
      this.amapPlugin.getRegeo({  
        success: (data) => {  
          console.log(data,'0202');
          let adress = data[0].name
          this.qdzt = "请求中";
          getQd({signAddress:adress}).then(res => {
            if(res.code == 200) {
              this.qdzt = "已签到";
              setTimeout(() =>{
                this.show = false
              },1000)
            }
          })
        }  
      });
      
    },
    formatDate(str) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        let date = new Date(); //获取系统时间
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = date.getDate();
        day = day < 10 ? "0" + day : day;
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        //let w = date.getDay();        //获取星期几
        // return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
        this.nowTime = h + ":" + m + ":" + s;
      }, 1000);
    },
    // 检查签到
    async checkQd(){
   const res =  await queryQd()
   this.show =  !res.data.signStatus
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep.container {
  padding: 30rpx 30rpx 0 30rpx;
  background: #f9fafa;
  .u-popup__content {
    border-radius: 50rpx;
  }
}

.notice {
  width: 100%;
  background: #fff;
  border-radius: 50rpx;
  margin: 30rpx auto;
  display: flex;
  align-items: center;
  padding: 15rpx 30rpx;
  box-sizing: border-box;

  .icon-box {
    width: 122rpx;
    height: 52rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .text-box {
    flex: 1;
    display: flex;
    font-size: 24rpx;
    color: #a0a1a7;

    .text {
      flex: 1;
    }

    .date {
      flex: 1;
      text-align: right;
    }
  }
}
.card {
  margin-top: 30rpx;
}

.tabs {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .item-tab {
    // flex: 1;
    width: 33%;
    text-align: center;
    color: #3e4245;
    margin-bottom: 20rpx;
    .icon {
      width: 100rpx;
      height: 100rpx;
      border-radius: 24rpx;
      box-sizing: border-box;
      margin: 0 auto 10rpx auto;
      display: flex;
      justify-content: center;
      align-items: center;
      // background: url('~@/static/icon/icon-tab1.png') no-repeat center center;
      // background-size:100% 100%;
    }
    .jdzs{
      width: 180rpx;
      margin-top: 4rpx;
      margin-bottom: 6rpx;
      height: 100rpx;
      border-radius: 24rpx;
      box-sizing: border-box;
      // margin: 0 auto 10rpx auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .tab2 {
    .icon {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      ::v-deep .u-badge {
        width: 20rpx;
        height: 28rpx;
        line-height: 28rpx;
        justify-content: center;
        //   position: absolute;
        //   top: 428rpx;
        //   left: 206rpx;
      }
    }
  }

  & .tab1 .icon {
    background: url("~@/static/index/fbrw.png") no-repeat center center;
    background-size: 100% 100%;
  }

  & .tab2 .icon {
    background: url("~@/static/index/dbsx.png") no-repeat center center;
    background-size: 100% 100%;
  }

  & .tab3 .icon {
    background: url("~@/static/index/rygl.png") no-repeat center center;
    background-size: 100% 100%;
  }

  & .tab4 .icon {
    background: url("~@/static/index/wsbgs.png") no-repeat center center;
    background-size: 100% 100%;
  }

  & .tab5 .icon {
    background: url("~@/static/index/rwlb.png") no-repeat center center;
    background-size: 100% 100%;
  }
  & .tab6 .icon {
    background: url("~@/static/index/xxcx.png") no-repeat center center;
    background-size: 100% 100%;
  }
  & .tab7 .icon {
    background: url("~@/static/index/fkxx.png") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
  }
  & .tab8 .jdzs {
    background: url("~@/static/index/mybook.png") no-repeat center center;
    background-size: 100% 100%;
  }
}

.title {
  color: #3e4245;
}

.item {
  font-size: 22rpx;
  color: #a0a1a7;
}

.item text:last-child {
  font-weight: 600;
  margin-left: 40rpx;
}

.qdBox {
  width: 542rpx;
  height: 548rpx;
  border-radius: 50rpx;
  overflow: hidden;
  background: linear-gradient(to top, rgb(139, 189, 255), #fff 70%);
  position: relative;
  // background: url("~@/static/index/pop_qd.png") 100% 100%;
  .qdBox_img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .qdRadio {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 36rpx;
    position: absolute;
    top: 180rpx;
    left: 170rpx;
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    background: linear-gradient(
      to bottom,
      rgba(12, 177, 248, 1),
      rgba(22, 110, 252, 1)
    );
    .qdTitle {
      position: absolute;
      top: 115px;
      font-weight: 600;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
