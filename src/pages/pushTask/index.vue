<template>
  <view class="container">
    <card :isShadow="true">
      <view class="uinput" @click="show1 = true">
        <u--input
          placeholder="发布对象"
          suffixIcon="arrow-down-fill"
          disabled
          v-model="form.fbdx"
          suffixIconStyle="color: #909399;font-size:28rpx"
        ></u--input>
      </view>
      <view v-if="form.fbdx == '派出所民警'" class="uinput">
        <view class="uinput" @click="show2 = true">
          <u--input
            placeholder="任务类型"
            suffixIcon="arrow-down-fill"
            disabled
            v-model="form.rwlx"
            suffixIconStyle="color: #909399;font-size:28rpx"
          ></u--input>
        </view>
        <view class="uinput" @click="goList(form.fbdx)">
          <u--input
            placeholder="派出所"
            suffixIcon="play-right-fill"
            disabled
            v-model="form.pcs"
            suffixIconStyle="color: #909399;font-size:28rpx"
          ></u--input>
        </view>
      </view>
      <view class="uinput" v-if="form.fbdx == '吸毒人员'">
        <view class="uinput" @click="show4 = true">
          <u--input
            placeholder="任务类型"
            suffixIcon="arrow-down-fill"
            disabled
            v-model="form.rwlx"
            suffixIconStyle="color: #909399;font-size:28rpx"
          ></u--input>
        </view>
        <view class="uinput" @click="goList(form.fbdx)">
          <u--input
            placeholder="吸毒人员"
            suffixIcon="play-right-fill"
            disabled
            v-model="form.xdry"
            suffixIconStyle="color: #909399;font-size:28rpx"
          ></u--input>
        </view>
      </view>

     
      <view class="myTextarea">
        <u--textarea v-model="form.rwnr" placeholder="请输入任务内容"  height="200"></u--textarea>
      </view>
       
        <view slot="footer">
          <view class="flex-end">
            <u-button
              type="primary"
              size="small"
              shape="circle"
              text="发 布"
              @click="handlePush"
            ></u-button>
          </view>
        </view>
    </card>

    <u-notify message="Hi uView" ref="uNotify"></u-notify>
    <u-picker
      :show="show1"
      :columns="fbdxList"
      keyName="label"
      @confirm="confirm1"
      @cancel="show1 = false"
    ></u-picker>
    <u-picker
      :show="show2"
      :columns="rwlxList"
      keyName="label"
      @confirm="confirm2"
      @cancel="show2 = false"
    ></u-picker>
    <u-picker
      :show="show3"
      :columns="pcsList"
      keyName="deptName"
      @confirm="confirm3"
      @cancel="show3 = false"
      @change="changeHandler"
      ref="uPicker"
    ></u-picker>
    <u-picker
      :show="show4"
      :columns="xdrwList"
      keyName="label"
      @confirm="confirm4"
      @cancel="show4 = false"
    ></u-picker>
  </view>
</template>

<script>
import Card from "@/components/Card.vue";
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
      form: {
        fbdx: "",
        rwlx: "",
        pcs: "",
        xdry: "",
        rwnr: "",
        pageSize: 10,
        pageNum: 1,
      },
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      fbdxList: [
        [
          { label: "派出所民警", id: 100 },
          { label: "吸毒人员", id: 1 },
        ],
      ],
      rwlxList: [
        [
          { label: "核查吸毒人员", id: 0, name: "XDRYHC" },
          { label: "旅馆住宿核查", id: 1, name: "LVZSHC" },
        ],
      ],
      xdrwList: [
        [
          { label: "上传尿检结果", id: 0, name: "SCNJJG" }
        ],
      ],
      pcsList: [],
      pcsry: [
        [
          { deptName: "甲", id: 0 },
          { deptName: "乙", id: 1 },
        ],
        [
          { deptName: "丙", id: 2 },
          { deptName: "丁", id: 3 },
        ],
        [
          { deptName: "卯", id: 4 },
          { deptName: "丑", id: 5 },
        ],
      ],
      rwlx: "",
      chose:0,
      userInfor:{},
      receiverUserid:0,
      id:1
    };
  },
  onLoad() {
    // 获取id信息
    this.userInfor = uni.getStorageSync('userInfor')
    uni.$on("setData", (data) => {
      if (data) {
        this.form.xdry = data.name || data.nickName || '';
        this.form.pcs = data.name ||  data.nickName || ''
        this.receiverUserid = data.id
      }
    });
  },
  methods: {
    goList(e) {
      uni.navigateTo({
        url: "/pages/pushTask/ryList?role="+e
      });
    },
    confirm1(value) {
      this.form.fbdx = value.value[0].label;
      this.id = value.value[0].id
      this.show1 = false;
    },
    confirm2(value) {
      this.form.rwlx = value.value[0].label;
      this.rwlx = value.value[0].name;
      this.show2 = false;
      this.chose=1
    },
    confirm3(value) {
      if (value.value) {
        this.form.pcs = value.value[0].deptName + " " + value.value[1].deptName;
      }
      this.show3 = false;
    },
    confirm4(value) {
      this.form.rwlx = value.value[0].label;
      this.rwlx = value.value[0].name;
      this.show4 = false;
      this.chose=2
    },
    changeHandler(e) {
      const {
        columnIndex,
        value,
        values, // values为当前变化列的数组内容
        index,
        // 微信小程序无法将picker实例传出来，只能通过ref操作
        picker = this.$refs.uPicker,
      } = e;
      // 当第一列值发生变化时，变化第二列(后一列)对应的选项
      if (columnIndex === 0) {
        // picker为选择器this实例，变化第二列对应的选项
        picker.setColumnValues(1, this.pcsry[index]);
      }
    },
    handlePush() {
      if (this.form.fbdx == "") {
        this.$refs.uNotify.show({
          type: "warning",
          message: "请选择派发对象",
          duration: 1000 * 3,
          safeAreaInsetTop: true,
        });
      }else if (this.form.pcs == "") {
        this.$refs.uNotify.show({
          type: "warning",
          message: "请选择派发对象",
          duration: 1000 * 3,
          safeAreaInsetTop: true,
        });
      }
       else {
        let params = {
          ...this.form,
          taskType: this.rwlx,
          taskStatus: "CREATE",
          note:this.form.rwnr,
          promoterUserid:this.userInfor.userId,
          promoterName:this.userInfor.nickName,
          receiverUserid:this.receiverUserid,
          receiverName:this.form.xdry
        };
        this.$service.pushTask.addTask(params).then((res) => {
          this.$refs.uNotify.show({
            type: "success",
            message: "发布成功",
            duration: 1000 * 3,
            safeAreaInsetTop: true,
          });
          setTimeout(() => {
            uni.navigateBack();
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
.myTextarea{
  margin-top: 20rpx;
  }
</style>