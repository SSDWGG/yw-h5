<template>
  <view class="container">
    <u-notify message="Hi uView" ref="uNotify"></u-notify>
    <view style="margin-bottom:120rpx">
      <card :isShadow="true">
      <u--form labelPosition="left" labelWidth="80">
        <u-form-item label="发布人">
          <text>{{ form.promoterName || '' }}</text>
        </u-form-item>
        <u-form-item label="接收人">
          <text>{{ form.receiverName || '' }}</text>
        </u-form-item>

        <u-form-item label="任务类型">
          <text>
            {{
              form.taskType == "XDRYHC"
                ? "吸毒人员核查"
                : form.taskType == "LVZSHC"
                ? "旅馆住宿核查"
                : form.taskType == "SCNJJG"
                ? "上传尿检结果"
                : form.taskType == "QD"
                ? "签到"
                : ""
            }}</text
          >
        </u-form-item>
        <u-form-item label="创建时间">
          <text>{{ form.createTime || '' }}</text>
        </u-form-item>
        <u-form-item v-if="taskStatus == 'FINISH'" label="处理人">
          <text>{{ form.feedbackName || '' }}</text>
        </u-form-item>
        <!-- <u-form-item v-if="taskStatus == 'FINISH'" label="完成时间">
          <text>{{ form.feedbackTime || '' }}</text>
        </u-form-item> -->
        <u-form-item labelPosition="top" label="任务描述">
          <u--textarea
            v-model="form.note"
            disabled
            placeholder="请输入内容"
          ></u--textarea>
        </u-form-item>
        <u-form-item labelPosition="top" label="反馈内容">
          <u--textarea
            v-model="clnr"
            :disabled="disabled"
            placeholder="请输入内容"
          ></u--textarea>
        </u-form-item>
        <u-form-item
          labelPosition="top"
          label="图片"
          v-if="form.taskStatus == 'CREATE'"
          disabled
        >
          <u-upload
            :fileList="urls"
            :maxCount="1"
            @afterRead="upLoadAfterRead"
            @delete="upLoadDelete"
          ></u-upload>
        </u-form-item>
        <u-form-item
          labelPosition="top"
          label="图片"
          v-if="form.taskStatus == 'FINISH'"
          class="fkzp"
          disabled
        >
          <u-album :urls="urls1"  :rowCount="4" class="fktp"></u-album>
        </u-form-item>
      </u--form>
      <view slot="footer">
        <view class="flex">
          <u-button
            v-if="taskStatus == 'CREATE' && userInfor.userTypeEnum != '禁毒中队'"
            type="primary"
            text="立即反馈"
            @click="reportEdit"
            style="margin-bottom: 20rpx"
          ></u-button>
          <u-button
            v-if="taskStatus == 'FINISH' && userInfor.userTypeEnum == '禁毒中队'"
            type="primary"
            text="重新核查"
            @click="handleCheck"
            style="margin-bottom: 20rpx"
          ></u-button>
          <u-button type="error" text="返回" @click="handleReturn"></u-button>
        </view>
      </view>
    </card>
    </view>
    
  </view>
</template>

<script>
import Card from "@/components/Card.vue";
import { getTaskByid,deleteTask } from "@/api/montageApi";
import location from "@/utils/locationUrl";
import { mapGetters } from "vuex";
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
  return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
  // return year + "-" + month + "-" + day;
}
export default {
  components: {
    Card,
  },
  data() {
    return {
      location,
      jbnr: "",
      form: {},
      urls: [],
      urls1: [],
      clnr: "",
      taskStatus: null,
      userInfor: [],
      disabled: false,
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  onLoad(option) {
    this.getUser(option.id);
    if (option.taskStatus) {
      this.taskStatus = option.taskStatus || "";
    }
    this.userInfor = uni.getStorageSync("userInfor");
    if (this.userInfor.userTypeEnum == '禁毒中队') {
      this.disabled = true;
    }
    if (option.taskStatus == 'FINISH') {
       this.disabled = true
    }
  },
  methods: {
    getUser(id) {
      getTaskByid(id).then((res) => {
        this.form = res.data || {}
        this.urls1 =  [ 'https://gayws.wuchuangroup.com:8443/prod-api' + res.data.pictureUrls] || ""
        this.clnr = res.data.feedbackResult
      });
    },
    // 完成任务
    reportEdit() {
      let params = {};
      if (this.taskStatus == "CREATE") {
        params = {
          id: this.form.id,
          taskStatus: "FINISH",
          feedbackResult: this.clnr,
          // feedbackTime:formatDate(),
          feedbackUserid: this.userInfor.userId,
          feedbackName: this.userInfor.userId,
          pictureUrls:
            this.urls
              .map((e) => {
                return e.url;
              })
              .join(",") || "",
        };
      } else {
        params = {
          id: this.form.id,
          taskStatus: "FINISH",
          feedbackResult: this.clnr,
          // feedbackTime:formatDate(),
          feedbackUserid: this.userInfor.userId,
          feedbackName: this.userInfor.userId,
        };
      }
      this.$service.personMange.taskEdit(params).then((res) => {
        if (res.code == 200) {
          this.$refs.uNotify.show({
            type: "success",
            message: res.msg,
            duration: 1000 * 3,
            safeAreaInsetTop: true,
          });
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
    async upLoadAfterRead(event) {
      let lists = [].concat(event.file);
      lists.map((item) => {
        this.urls.push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url, event.name);
        let item = this.urls[0];
        this.urls.splice( 0,1,Object.assign(item, {
            status: "success",
            message: "",
            url: result,
          })
        );
      }
    },
    uploadFilePromise(url, index) {
      return new Promise((resolve, reject) => {
         
        let a = uni.uploadFile({
          url: this.location.locatioUrl + "/common/upload",
          filePath: url,
          name: "file",
          header: {
            Authorization: "Bearer " + this.token,
          },
          success: (res) => {
            setTimeout(() => {
              let data = JSON.parse(res.data);
              //   this.location.ImgUrl+'/prod-api' +
              resolve( data.fileName);
            }, 1000);
          },
          fail: (err) => {
          },
        });
      });
    },
    upLoadDelete(event) {
      this.urls.splice(0, 1);
    },
    //  重新核查
    handleCheck() {
      uni.$u.route({
        url: "/pages/pushTask/cxhc?id=" + this.form.id,
        params: {
          taskStatus: "CREATE",
          taskType: this.form.taskType,
          note: this.form.note,
          receiverName:this.form.receiverName
        },
      });
    },
    // 返回上一级
    handleReturn() {
     uni.navigateBack()
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
}
.flex {
  display: flex;
}
.ubutton {
  width: 50%;
}
.popview {
  width: 80vw;
}
::v-deep .fkzp{
 .u-form-item__body__right__content__slot:last-child{
  justify-content: flex-start;
 }
.fktp{
  text-align: left;
}
}
</style>