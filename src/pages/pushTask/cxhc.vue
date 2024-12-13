<template>
  <view class="container">
    <card :isShadow="true">
      <view class="uinput">
        <u--input
          placeholder="发布对象"
          disabled
          v-model="form.fbdx"
        ></u--input>
      </view>
        <view class="uinput">
          <u--input
            placeholder="任务类型"
            disabled
            v-model="form.rwlx"
          ></u--input>
        </view>
        <view class="uinput" @click="goList" v-if="form.fbdx == '派出所民警'">
          <u--input
            placeholder="派出所"
            suffixIcon="play-right-fill"
            disabled
            v-model="form.pcs"
            suffixIconStyle="color: #909399;font-size:28rpx"
          ></u--input>
        </view>
    </card>
    <view style="margin-top: 20rpx">
      <card :isShadow="true">
        <text>任务内容</text>
        <u--textarea v-model="form.rwnr" placeholder="请输入内容"></u--textarea>
        <view slot="footer">
          <view class="flex-end">
            <u-button
              type="primary"
              size="small"
              shape="circle"
              text="发 布"
              @click="handleHc"
            ></u-button>
          </view>
        </view>
      </card>
    </view>
    <u-notify message="Hi uView" ref="uNotify"></u-notify>
  </view>
</template>

<script>
import Card from "@/components/Card.vue";
import { deleteTask } from '@/api/montageApi'
function formatDate(str) {
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
  return year + "-" + month + "-" + day;
}
export default {
  components: {
    Card,
  },
  data() {
    return {
      disabled:false,
      form: {
        fbdx: "派出所民警",
        rwlx: "",
        pcs: "",
        // fbsj: formatDate(),
        rwnr: "",
      },
      show: false,
      taskId:0,
      name:'',
      taskStatus:''
    };
  },
  onLoad(options) {
    // 获取id信息
    this.userInfor = uni.getStorageSync('userInfor')
   if (options) {
      this.name = options.name
      this.form.rwlx = options.taskType
      // this.form.rwlx = options.taskType == 'XDRYHC'?'吸毒人员核查':options.taskType=='LVZSHC'?'旅馆住宿核查':options.taskType=='SCNJJG'?'上传尿检结果':'签到'
      this.form.fbdx = options.taskType == 'SCNJJG'? '吸毒人员' : '派出所民警'
      this.taskStatus = options.taskStatus
   }
      uni.$on("setData", (data) => {
      if (data) {
        this.form.pcs = data.name || ''
        this.taskId = data.id || ''
      }
    });
  },
  methods: {
    goList() {
      uni.navigateTo({
        url: "/pages/pushTask/ryList?role=" + this.form.fbdx,
      });
    },
    handleHc() {
      if (this.form.pcs == "") {
        this.$refs.uNotify.show({
          type: "warning",
          message: "请选择人员",
          duration: 1000 * 3,
          safeAreaInsetTop: true,
        });
      } else {
        let params = {
          ...this.form,
          taskType: this.form.rwlx,
          taskStatus: "CREATE",
          note:this.form.rwnr,
          promoterUserid:this.userInfor.userId,
          promoterName:this.userInfor.nickName,
          receiverUserid:this.taskId,
          receiverName:this.form.pcs
        };
        this.$service.pushTask.addTask(params).then((res) => {
          this.$refs.uNotify.show({
            type: "success",
            message: "发布成功",
            duration: 1000 * 3,
            safeAreaInsetTop: true,
          });
          setTimeout(() => {
           deleteTask(this.taskId)
            uni.navigateBack({
              delta:3
            })
          }, 1000);
        });
      }
    },
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
::v-deep.uinput {
  width: 100%;
  .u-border {
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    background-color: #fff !important;
  }
}
.uinput + .uinput {
  margin-top: 20rpx;
}
</style>