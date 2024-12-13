<template>
  <view class="container">
    <view v-if="userInfor.userTypeEnum != '吸毒人员'">
      <u-subsection
      :list="list"
      keyName="name"
      :current="current"
      @change="sectionChange"
    ></u-subsection>
    </view>
    <view v-else>  
      <u-subsection
      :list="list1"
      keyName="name"
      :current="current2"
      @change="sectionChange"
    ></u-subsection>
    </view>
    <view class="card" v-for="(it, index) in rwList" :key="index">
      <Card
        :isShadow="true"
        
        style="margin: 20rpx auto"
      >
        <view class="flex-between">
          <view class="title">{{ it.taskType | newVal }}</view>
          <view class="ckxq" @click="goDetail(it)">查看详情</view>
        </view>
        <view style="margin-top: 20rpx"
          ><text class="font-blod">发布人员：</text>{{it.promoterName || ''}}</view
        >
        <view><text class="font-blod">时间：</text>{{it.createTime || ''}}</view>
        <view
          ><text class="font-blod">任务描述：</text>{{ it.note || "" }}</view
        >
      </Card>
    </view>
    <view class="more" @click="loadingMore">
      <u-loadmore :status="status" height="50" :line="true" />
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
      isShow: 1,
      status: "loadmore",
      list: [
        { name: "已发布", id: "" },
        { name: "未反馈", id: "CREATE" },
        { name: "已反馈", id: "FINISH" },
      ],
      list1: [
        { name: "未反馈", id: "CREATE" },
        { name: "已反馈", id: "FINISH" },
      ],
      form: {
        pageSize: 10,
        pageNum: 1,
        taskStatus: "CREATE",
      },
      current:1,
      current2:0,
      rwList: [],
      userInfor: {},
    };
  },
  onShow() {
    this.userInfor = uni.getStorageSync("userInfor");
    this.getData();
    
  },
  filters: {
    newVal(val) {
      if (val == "SCNJJG") {
        return (val = "上传尿检结果");
      } else if (val == "XDRYHC") {
        return (val = "吸毒人员核查");
      }
    },
  },
  methods: {
    getData() {
      let params
      if (this.userInfor.userTypeEnum == "禁毒中队") {
        params = {
          pageSize: 10,
          pageNum: 1,
          taskStatus: this.form.taskStatus,
        };
      } else {
        params = {
          pageSize: 10,
          pageNum: 1,
          taskStatus: this.form.taskStatus,
          receiverUserid: this.userInfor.userId,
        };
      }
      this.status = "loading";
      this.$service.pushTask.getTaskList(params).then((res) => {
        if (res.code == 200) {
          this.rwList = res.data.content || [];
          if ((res.data.number+1) * res.data.size >= res.data.totalElements) {
            this.status = "nomore";
          } else {
            this.status = "loadmore";
          }
        }
      });
    },
    loadingMore() {
      if (this.status != "nomore") {
        this.form.pageNum++;
        let params
        if (this.userInfor.userTypeEnum == "禁毒中队") {
          params = {
            ...this.form,
            taskStatus: this.form.taskStatus,
          };
        } else {
          params = {
            ...this.form,
            taskStatus: this.form.taskStatus,
            receiverUserid: this.userInfor.userId,
          };
        }
        this.status = "loading";
        this.$service.pushTask.getTaskList(params).then((res) => {
          if (res.code == 200) {
            this.rwList.push(...res.data.content);
            if ((res.data.number + 1) * res.data.size >=  res.data.totalElements) {
              this.status = "nomore";
            } else {
              this.status = "loadmore";
            }
          }
        });
      }
    },
    goDetail(item) {
      uni.navigateTo({
        url:"/pages/todoAgency/detail?id=" +item.id+"&taskStatus="+item.taskStatus
      });
    },
    sectionChange(value) {
      if(this.userInfor.userTypeEnum != '吸毒人员') {
        this.current = value;
        this.form.pageNum = 1;
        this.form.taskStatus = this.list[value].id;
      } else {
        this.current2 = value;
        this.form.pageNum = 1;
        this.form.taskStatus = this.list1[value].id;
      }
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx 30rpx 0 30rpx;
  position: relative;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
  margin-top: 20rpx;
  .title {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 30rpx;
    padding-left: 14rpx;
    border-left: 10rpx solid #3c9cff;
  }
  .ckxq {
    color: #3c9cff;
    cursor: pointer;
    font-size: 30rpx;
  }
  .font-blod {
    font-weight: 600;
    font-size: 30rpx;
  }
}
</style>