<template>
  <view class="container">
    <card :isShadow="true">
      <view class="uinput">
        <u--input placeholder="姓名" disabled v-model="form.reportName"
          suffixIconStyle="color: #909399;font-size:28rpx"></u--input>
      </view>
    </card>
    <view style="margin-top:20rpx">
      <card :isShadow="true">
        <text>上报内容</text>
        <u--textarea v-model="form.content" placeholder="请输入内容" autoHeight height="140"></u--textarea>
      </card>
    </view>
    <view style="margin-top: 20rpx">
      <card :isShadow="true">
        <text>照片</text>
        <view style="margin-top:20rpx">
          <u-upload :fileList="form.urls" :maxCount="1" @afterRead="upLoadAfterRead" @delete="upLoadDelete"></u-upload>
        </view>
        <view slot="footer">
          <view class="flex-end">
            <u-button type="primary" size="small" shape="circle" text="上 报" @click="report"></u-button>
          </view>
        </view>
      </card>
    </view>

    <u-notify message="Hi uView" ref="uNotify"></u-notify>

    <u-picker :show="show" :columns="rylb" keyName="label" @confirm="confirm1" @cancel="show = false"
      :defaultIndex="[0]"></u-picker>
  </view>
</template>

<script>
import Card from "@/components/Card.vue";
import location from '@/utils/locationUrl'
import { mapGetters } from 'vuex'
import { getFamilyUserbByid, getUserByid } from '@/api/montageApi'
export default {
  components: {
    Card,
  },
  computed: {
    ...mapGetters(['token'])
  },
  data() {
    return {
      location,
      form: {
        reportName: "", // 吸毒人员姓名
        reportTypeEnum: "", // 上报类型字典
        content: '', // 上报内容
        urls: [], // 图片上传目录

        feedbackUserid: '',
        drugUserid: '',
      },
      show: false,
      rylb: [
        [
          { label: "张三", id: 1 },
          { label: "李四", id: 2 }
        ],
      ],
    };
  },
  onLoad() {
    this.userInfor = uni.getStorageSync('userInfor')
    this.getxdry()
  },
  methods: {
    getxdry() {
      getFamilyUserbByid(this.userInfor.userId).then(res => {
        if (res.code == 200) {
          getUserByid(res.data.drugUserid).then(e => {
            if (e.code == 200) {
              this.form.reportName = e.data.name
              this.form.drugUserid = e.data.userid
            }
          })
        }
      })
    },
    report() {
      if (this.form.reportName == '') {
        this.$refs.uNotify.show({
          type: 'warning ',
          message: '请选择人员',
          duration: 1000 * 3,
          safeAreaInsetTop: true
        })
        return false
      }
      let params = {
        drugUserid: this.form.drugUserid,
        feedbackUserid: this.userInfor.userId,
        pictureUrls: this.form.urls.map(e => {
          return e.url
        }).join(','),
        content: this.form.content
      }

      this.$service.personMange.familyRepoet(params).then(res => {
        if (res.code == 200) {
          this.$refs.uNotify.show({
            type: 'success',
            message: res.msg,
            duration: 1000 * 3,
            safeAreaInsetTop: true
          })
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        } else {
          this.$refs.uNotify.show({
            type: 'error',
            message: res.msg,
            duration: 1000 * 3,
            safeAreaInsetTop: true
          })
        }
      })
    },
    confirm1(value) {
      this.form.reportName = value.value[0].label;
      this.form.reportTypeEnum = value.value[0].id;
      this.show = false;
    },
    async upLoadAfterRead(event) {
      let lists = [].concat(event.file);
      lists.map((item) => {
        this.form.urls.push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url, event.name);
        let item = this.form.urls[0];
        this.form.urls.splice(
          0,
          1,
          Object.assign(item, {
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
            Authorization: 'Bearer ' + this.token,
          },
          success: (res) => {
            setTimeout(() => {

              let data = JSON.parse(res.data);
              resolve(
                this.location.ImgUrl + '/prod-api' + data.fileName
              );
            }, 1000);
          },
          fail: (err) => {
          },
        });
      });
    },
    upLoadDelete(event) {
      this.form.urls.splice(0, 1);
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

.uinput+.uinput {
  margin-top: 20rpx;
}
</style>