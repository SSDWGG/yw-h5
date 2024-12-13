<template>
  <view class="container">
    <!-- <view class="uinput">
        <u--input
          type="text"
          placeholder="请输入姓名"
          v-model="xdry.value"
          @confirm="handleChange"
        >
        <template slot="suffix">
          <u-icon name="search" size="28rpx" color="#909399" @click="handleChange(xdry.value)"></u-icon>
        </template>
        </u--input>
      </view> -->

    <view class="content">
      <view class="card-box" v-for="(item, index) in tableData" :key="index">
        <card :isShadow="true">
          <view class="box_row1">
            <view class="flex">
              <img src="@/static/icon/头像.png" style="width:120rpx;height:120rpx" alt="">
            </view>
            <view style="margin-left:20rpx">
              <p>姓名：{{ item.name }}</p>
              <p>手机号码：{{ item.telephone }}</p>
            </view>
            <text class="xq" @click="hangleDetail(item)">详情</text>
          </view>
        </card>
      </view>
      <!-- <u-loadmore :status="status" height="50" :line="true" /> -->
      <u-notify message="Hi uView" ref="uNotify"></u-notify>
    </view>
  </view>
</template>

<script>
import Card from '@/components/Card.vue'
import { getFamilyUserbByid, getUserByid } from '@/api/montageApi'
export default {
  components: {
    Card
  },
  data() {
    return {
      tableData: [],
      status: 'loadmore',
      xdry: { value: '', id: '' },
      loadStatus: 'loadmore',
      userInfor: '',
      form: {
        pageNum: 1,
        pageSize: 10,
        feedbackUserid: '201'
      }
    }
  },
  onLoad() {
    this.getList()
  },
  methods: {
    getList() {
      this.userInfor = uni.getStorageSync('userInfor')

      getFamilyUserbByid(this.userInfor.userId).then(res => {
        if (res.code == 200) {
          getUserByid(res.data.drugUserid).then(e => {
            if (e.code == 200) {
              this.tableData = [
                { ...e.data }
              ]
            }
          })
        }
      })
    },
    handleChange(e) {
      if (e == '') {
        this.$refs.uNotify.show({
          type: 'warning',
          message: '请输入姓名',
          duration: 1000 * 3,
          safeAreaInsetTop: true
        })
        return false
      }
    },
    hangleDetail(item) {
     console.log('8888');
     uni.navigateTo({
       
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx 30rpx 0 30rpx;
}

.flex {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

::v-deep.uinput {
  width: 100%;

  .u-border {
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    background-color: #F8F9F9 !important;
  }
}

.uinput+.uinput {
  margin-top: 20rpx;
}

.content {

  // margin-top: 30rpx;
  .card-box {
    margin-bottom: 30rpx;
    position: relative;

    .box_row1 {
      display: flex;
      align-items: center;

      // justify-content: space-between;
      .time {
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
      }

      .xq {
        position: absolute;
        top: 20rpx;
        right: 20rpx;
        width: 70rpx;
        margin-left: 20rpx;
        font-size: 28rpx;
        color: rgba(20, 127, 251, 1);
        cursor: pointer;
      }
    }

    .box_title {
      display: flex;
      align-items: center;
      font-size: 28rpx;

      img {
        width: 50rpx;
        height: 50rpx;
        margin-right: 20rpx;
      }
    }

    .btnBox {
      display: flex;
      margin-top: 40rpx;
      justify-content: flex-end;
    }
  }
}</style>