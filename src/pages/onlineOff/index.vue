<template>
  <view class="container">
    <!-- <u-subsection :list="list" keyName="name" fontSize="14" :current="current" @change="sectionChange"></u-subsection> -->
    <view class="nav">
      <u-tabs :list="list" @change="reportTypeChange"></u-tabs>
    </view>
    <!-- <view style="margin-top:20rpx">
      <u-tabs :list="list2" @change="tabChange"></u-tabs>
    </view> -->

    <view class="content">
      <view class="card-box" v-for="(item, index) in tableData" :key="index">
        <card :isShadow="true">
          <view class="box_row1">
            <view class="box_title" v-if="jd !== '禁毒知识'">
              <img src="@/static/icon/举报电话.png" alt="" class="img" radius="10"/>
              <view class="bt">
                <view>{{ item.title || "举报" }}</view>
                <view class="time">{{ item.createTime }}</view>
              </view>
            </view>
            <view class="box_title" v-else>
            <view class="img2">
              <img
                v-if="item.coverUrl"
                :src="item.coverUrl"
              />
            </view>
              <view class="bt" @click="handleJd(item)">
                <view>{{ item.title || "" }}</view>
                <view>{{ item.description || " " }}</view>
                <view class="time">{{ item.createTime }}</view>
              </view>
            </view>
            <!-- <view class="flex" v-if="jd !== '禁毒知识'">
              <text class="xq" @click="hangleDetail(item)">详情</text>
            </view> -->
          </view>
          <view class="btnBox" v-if="jd !== '禁毒知识'">
            <u-button
              type="error"
              size="mini"
              text="处理"
              @click="hangleDetail(item)"
            ></u-button>
            <u-button
              type="primary"
              size="mini"
              text="派发"
              @click="goTask(item)"
            ></u-button>
          </view>
        </card>
      </view>
      <view class="more" @click="loadingMore">
        <u-loadmore :status="loadStatus" height="50" :line="true" />
      </view>
    </view>
  </view>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  components: {
    Card,
  },
  data() {
    return {
      isTab:true,
      form: {
        pageSize: 10,
        pageNum: 1,
        reportStatus: "CREATE",
        reportType: "JSJB",
      },
      list: [
        // { name: "尿检", id: "NJ" },
        // { name: "出行", id: "CX" },
        { name: "举报", id: "JSJB" },
        { name: "生活求助", id: "SHQZ" },
        { name: "咨询", id: "ZX" },
        { name: "禁毒知识", id: "JDZS" },
      ],
      list2: [
        { name: "新建", key: "CREATE" },
        { name: "已指派", key: "ASSIGN" },
        { name: "已完成", key: "FINISH" },
      ],
      current: 0,
      loadStatus: "loadmore",
      tableData: [],
      totalElements: 5,
      jd: "",
      params: {
        pageSize: 10,
        pageNum: 1,
      },
    };
  },
  onShow() {
    this.getList();
  },
  methods: {
    tabChange(value) {
      this.form.reportStatus = value.key;
      this.getList();
    },
    reportTypeChange(value) {
      this.form.reportType = value.id;
      this.getList(value);
      this.jd = value.name;
    },
    getList(e) {
      this.loadStatus = "loading";
      this.form = {
        pageSize: 10,
        pageNum: 1,
        reportType: this.form.reportType,
        reportStatus: this.form.reportStatus,
      };
      if (e && e.name == "禁毒知识") {
        this.$service.pushTask.jdzs(this.params).then((res) => {
          if (res.code == 200) {
            this.tableData = res.data.content || [];
            if (!!res.data.last) {
              this.loadStatus = "nomore";
            } else {
              this.loadStatus = "loadmore";
            }
          }
        });
      } else {
        this.$service.personMange.getReportList(this.form).then((res) => {
          if (res.code == 200) {
            this.tableData = res.data.content || [];
            if (!!res.data.last) {
              this.loadStatus = "nomore";
            } else {
              this.loadStatus = "loadmore";
            }
          }
        });
      }
    },
    loadingMore() {
      if (this.jd == "禁毒知识") {
        if (this.loadStatus != "nomore") {
          this.form.pageNum++;
          this.loadStatus = "loading";
          this.$service.pushTask.jdzs(this.params).then((res) => {
            if (res.code == 200) {
              this.tableData.push(...res.data.content);
              if (!!res.data.last) {
                this.loadStatus = "nomore";
              } else {
                this.loadStatus = "loadmore";
              }
            }
          });
        }
      } else {
        if (this.loadStatus != "nomore") {
          this.form.pageNum++;
          this.loadStatus = "loading";
          this.$service.personMange.getReportList(this.form).then((res) => {
            if (res.code == 200) {
              this.tableData.push(...res.data.content);
              if (!!res.data.last) {
                this.loadStatus = "nomore";
              } else {
                this.loadStatus = "loadmore";
              }
            }
          });
        }
      }
    },
    sectionChange(index) {
      this.current = index;
    },
    hangleDetail(item) {
      uni.navigateTo({
        url: "/pages/onlineOff/detail?id=" + item.id,
      });
    },
    handleJd(item) {
      uni.navigateTo({
        url: "/pages/onlineOff/jdzs?id="+item.id,
      });
      // uni.$emit("setData", item);
    },
    goTask(item) {
      uni.navigateTo({
        url: "/pages/pushTask/index?id=" + item.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx 30rpx 0 30rpx;
}
.nav {
  ::v-deep .u-tabs__wrapper__nav__line {
    transform: translateX(18rpx);
  }
  ::v-deep .u-tabs__wrapper__nav__item {
    width: 18%;
    // padding: 0 14rpx;
  }
  ::v-deep .u-tabs__wrapper__nav__item__text{
    font-size: 28rpx;
  }
}
.flex {
  display: flex;
  align-items: center;
}
.content {
  margin-top: 30rpx;
  .card-box {
    margin-bottom: 30rpx;
    position: relative;
    .box_row1 {
      display: flex;
      justify-content: space-between;
      .time {
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
      }
      .xq {
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
      .img {
        width: 50rpx;
        height: 50rpx;
        margin-right: 20rpx;
      }
      .img2 {
        width: 160rpx;
        height: 160rpx;
        margin-right: 20rpx;
        border-radius: 20rpx;
        img{
          width: 100%;
          height: 100%;
          border-radius: 20rpx;
        }
      }
    }
    .btnBox {
      display: flex;
      margin-top: 40rpx;
      justify-content: flex-end;
      ::v-deep  .u-button{
        width: 200rpx;
      }
    }
  }
}
</style>