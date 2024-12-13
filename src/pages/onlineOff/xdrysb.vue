<template>
  <view class="container">
    <card :isShadow="true">
      <view class="uinput">
        <u--input
          placeholder="标题"
          v-model="form.title"
          suffixIconStyle="color: #909399;font-size:28rpx"
        ></u--input>
      </view>
      <view class="uinput" @click="show1 = true">
        <u--input
          placeholder="上报类型"
          suffixIcon="arrow-down-fill"
          disabled
          v-model="form.reportType"
          suffixIconStyle="color: #909399;font-size:28rpx"
        ></u--input>
      </view>
      <view class="uinput" v-if="form.reportType == '尿检'">
        <view class="uinput">
          <u--input
            placeholder="监测机构"
            v-model="form.testingOrganization"
          ></u--input>
        </view>
      </view>
    </card>
    <view style="margin-top:20rpx" v-if="form.reportType != '尿检'">
      <card :isShadow="true">
        <text>上报内容</text>
        <u--textarea v-model="form.content" placeholder="请输入内容" autoHeight height="140"></u--textarea>
        
      </card>
    </view>
    <view style="margin-top: 20rpx">
      <card :isShadow="true">
        <text>照片</text>
        <view style="margin-top:20rpx">
          <u-upload
          :fileList="form.urls"
          :maxCount="1"
          @afterRead="upLoadAfterRead"
          @delete="upLoadDelete"
        ></u-upload>
        </view>
        <view slot="footer" >
          <view class="flex-end">
            <u-button type="primary" size="small" shape="circle" text="上 报" @click="report"></u-button>
          </view>
        </view>
      </card>
    </view>

    <u-notify message="Hi uView" ref="uNotify"></u-notify>

    <u-picker
      :show="show1"
      :columns="fbdxList"
      keyName="label"
      @confirm="confirm1"
      @cancel="show1 = false"
      :defaultIndex="[0]"
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
      :columns="xdrwList"
      keyName="label"
      @confirm="confirm3"
      @cancel="show3 = false"
    ></u-picker>
  </view>
</template>

<script>
import Card from "@/components/Card.vue";
import location from '@/utils/locationUrl'
import { mapGetters } from 'vuex'
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
        reportType: "", // 上报内容
        reportTypeEnum: "", // 上报类型字典
        testingOrganization: "", // 检测机构
        title:'', //标题
        content:'', // 上报内容
        urls: [], // 图片上传目录
      },
      show1: false,
      show2: false,
      show3: false,
      fbdxList: [
        [
          { label: "尿检", id: "NJ" },
          { label: "出行", id: "CX" },
          // { label: "社交软件", id: "SJRJ" },
          { label: "举报", id: "JSJB" },
          { label: "生活求助", id: "SHQZ" },
          { label: "咨询", id: "ZX" },
        ],
      ],
      rwlxList: [
        [
          { label: "核查吸毒人员", id: 0 },
          { label: "旅馆住宿核查", id: 1 },
        ],
      ],
      xdrwList: [
        [
          { label: "上传尿检结果", id: 0 },
          { label: "签到", id: 1 },
        ],
      ],
      userInfor:{}
    };
  },
  onLoad() {
    this.userInfor = uni.getStorageSync("userInfor");
  },
  methods: {
    goList() {
      uni.navigateTo({
        url: "/pages/pushTask/ryList",
      });
    },
    report(){
      if(this.form.title == '') {
        this.$refs.uNotify.show({
          type: 'warning',
          message: '请输入标题',
          duration: 1000 * 3,
          safeAreaInsetTop:true
        })
        return false
      }
      if(this.form.reportType == '') {
        this.$refs.uNotify.show({
          type: 'warning ',
          message: '请选择上报类型',
          duration: 1000 * 3,
          safeAreaInsetTop:true
        })
        return false
      }
      if(this.form.reportType == '尿检'&&this.form.testingOrganization == '') {
        this.$refs.uNotify.show({
          type: 'warning ',
          message: '请输入检测机构',
          duration: 1000 * 3,
          safeAreaInsetTop:true
        })
        return false
      }
      if(this.form.reportType != '尿检'&&this.form.content == '') {
        this.$refs.uNotify.show({
          type: 'warning ',
          message: '请输入上报内容',
          duration: 1000 * 3,
          safeAreaInsetTop:true
        })
        return false
      }
      let params = {
        drugUserid: this.userInfor.userId,
        drugUsername: this.userInfor.nickName,
        title: this.form.title,
        reportType:this.form.reportTypeEnum,
        reportStatus: 'CREATE',
        urls: this.form.urls.map(e=>{
          return e.url
        }).join(',')
      }
      if(this.form.reportType == '尿检') {
        params.testingOrganization = this.form.testingOrganization
        
      } else {
        params.content = this.form.content
      }
      this.$service.personMange.reportByXdry(params).then(res=>{
        if(res.code == 200) {
          this.$refs.uNotify.show({
            type: 'success',
            message: res.msg,
            duration: 1000 * 3,
            safeAreaInsetTop:true
          })
          setTimeout(()=>{
            uni.navigateBack()
          },1000)
        } else {
          this.$refs.uNotify.show({
            type: 'error',
            message: res.msg,
            duration: 1000 * 3,
            safeAreaInsetTop:true
          })
        }
      })
    },
    confirm1(value) {
      this.form.reportType = value.value[0].label;
      this.form.reportTypeEnum = value.value[0].id;
      this.show1 = false;
    },
    confirm2(value) {
      this.form.rwlx = value.value[0].label;
      this.show2 = false;
    },
    confirm3(value) {
      this.form.rwlx = value.value[0].label;
      this.show3 = false;
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
        const result = await this.uploadFilePromise(lists[i].url);
        let item = this.form.urls[0];
        this.form.urls.splice(0,1,Object.assign(item, {
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
                // this.location.ImgUrl+'/prod-api' + data.fileName
                this.location.ImgUrl + data.fileName
              );
            }, 1000);
          },
          fail: (err) => {
          },
        });
      });
    },
    upLoadDelete(event) {
      this.form.urls.splice(0,1);
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