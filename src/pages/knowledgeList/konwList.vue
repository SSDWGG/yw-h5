<template>
  <view class="container">
    <view class="card-box" v-for="(item, index) in tableData" :key="index">
      <card :isShadow="true">
        <view class="box_row1">
          <view class="box_title">
            <view class="img2">
              <img v-if="item.coverUrl" :src="item.coverUrl" />
            </view>
            <view class="bt" @click="handleJd(item)">
              <view>{{ item.title || "" }}</view>
              <view>{{ item.description || " " }}</view>
              <view class="time">{{ item.createTime }}</view>
            </view>
          </view>
        </view>
      </card>
    </view>
    <view class="more" @click="loadingMore">
      <u-loadmore :status="loadStatus" height="50" :line="true" />
    </view>
  </view>
</template>
<script>
import Card from '../../components/Card.vue';
export default {
  data() {
    return {
      params: {
        pageSize: 10,
        pageNum: 1,
      },
      tableData: [],
      loadStatus: "loadmore",
    };
  },
  components: {
    Card
  },
  onShow() {
    this.getList();
  },
  onLoad() {
    this.getList();
  },
  methods: {
    // 获取禁毒知识列表
    getList() {
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
    },
    // 查看禁毒知识
    handleJd(e) {
      uni.navigateTo({
        url: "/pages/onlineOff/jdzs?id=" + e.id,
      });
      // uni.$emit("setData", item);
    },
    // 加载更多
    loadingMore() {
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
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 30rpx 30rpx 0 30rpx;
}
.card-box {
    position: relative;
    margin-bottom: 30rpx;
    .box_row1 {
      display: flex;
      justify-content: space-between;
      .time {
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
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
        img {
          width: 100%;
          height: 100%;
          border-radius: 20rpx;
        }
      }
    }
}
</style>