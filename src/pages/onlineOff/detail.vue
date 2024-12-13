<template>
  <view class="container">
    <u-notify message="Hi uView" ref="uNotify"></u-notify>
    <view style="margin-bottom:20rpx">
      <card :isShadow="true">
        <u--form labelPosition="left" labelWidth="80">
          <u-form-item label="姓名:">
            <text>{{ form.drugUsername || "" }}</text>
          </u-form-item>
          <u-form-item label="标题:">
            <text>{{ form.title || "" }}</text>
          </u-form-item>
          <u-form-item label="类型:">
            <text>
              {{
                form.reportType == "NJ"
                ? "尿检"
                : form.reportType == "CX"
                  ? "出行"
                  : form.reportType == "SJRJ"
                    ? "社交软件"
                    : form.reportType == "JSJB"
                      ? "检索举报"
                      : form.reportType == "XXFK"
                        ? "信息反馈"
                        : ""
              }}</text>
          </u-form-item>
          <view>
            <text>内容:</text>
            <u--textarea v-model="form.content" placeholder="请输入内容" disabled placeholderClass="jbnr"></u--textarea>
          </view>
          <view>
            <text>图片:</text>
            <u-album :urls="urls1" keyName="src" :rowCount="4"></u-album>
          </view>
        </u--form>
      </card>
    </view>
    <card :isShadow="true" style="margin-top: 20rpx" v-if="form.reportStatus == 'CREATE'">
      处理结果：
      <view class="popview">
        <u--textarea v-model="clnr" placeholder="请输入内容"></u--textarea>
      </view>
      <view class="flex" style="margin-top: 20rpx">
        <view class="ubutton">
          <u-button type="primary" text="处理" @click="reportEdit"></u-button>
        </view>
      </view>
    </card>
  </view>
</template>

<script>
import Card from "@/components/Card.vue";
import { getReportByid } from "@/api/montageApi";
export default {
  components: {
    Card,
  },
  data() {
    return {
      jbnr: "",
      form: {},
      urls1: [],
      show: false,
      clnr: "",
    };
  },
  onLoad(options) {
    this.getUser(options.id);
  },
  methods: {
    getUser(id) {
      getReportByid(id).then((res) => {
        this.form = res.data || {};
        if (res.data.urls) {
          console.log(res.data.urls);
          this.urls1 = [{ src: res.data.urls }];
        } else {
          this.urls1 = [];
        }
      });
    },
    reportEdit() {
      let params = {
        ...this.form,
        reportStatus: "FINISH",
        result: this.clnr,
      };
      this.$service.personMange.ReportEdit(params).then((res) => {
        if (res.code == 200) {
          this.$refs.uNotify.show({
            type: "success",
            message: res.msg,
            duration: 1000 * 3,
            safeAreaInsetTop: true,
          });
          this.show = false;
          setTimeout(() => {
            uni.navigateBack();
          }, 1000);
        } else {
          this.$refs.uNotify.show({
            type: "error",
            message: res.msg,
            duration: 1000 * 3,
            safeAreaInsetTop: true,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.container {
  padding: 30rpx 30rpx 0 30rpx;

  .u-form-item__body {
    padding: 8rpx 0;
  }

  .u-form-item__body__right__content__slot {
    justify-content: flex-end;
  }

  ::v-deep .uni-textarea {
    text-align: left !important;
  }
}

.flex {
  display: flex;
}

.ubutton {
  width: 100%;
}
</style>