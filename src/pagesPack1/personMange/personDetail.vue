<template>
  <view class="form">
    <u--form
      labelPosition="left"
      :model="personData"
      ref="uForm"
      label-width="100"
    >
      <u-form-item label="姓名" borderBottom>
        <view class="font-right">{{personData.name || ''}}</view>
      </u-form-item>
      <u-form-item label="性别" borderBottom>
        <view class="font-right">{{personData.gender=="MALE"?"男性":"女性"}}</view>
      </u-form-item>
      <u-form-item label="年龄" borderBottom>
        <view class="font-right">{{personData.age || ''}}</view>
      </u-form-item>
      <u-form-item label="住址" borderBottom>
        <view class="font-right">{{personData.residence || ''}}</view>
      </u-form-item>
      <u-form-item label="户籍地" borderBottom>
        <view class="font-right">{{personData.censusRegister || ''}}</view>
      </u-form-item>
      <u-form-item label="户籍派出所" borderBottom>
        <view class="font-right">{{personData.localPoliceStation || ''}}</view>
      </u-form-item>
      <u-form-item label="手机" borderBottom>
        <view class="font-right">{{personData.telephone || ''}}</view>
      </u-form-item>
      <u-form-item label="身份证" borderBottom>
        <view class="font-right">{{personData.idCard || ''}}</view>
      </u-form-item>
      <u-form-item label="人员状态" borderBottom>
        <view class="font-right">
          {{personData.drugUserStatus=="WEI_FU_XI"?'未复吸':
            personData.drugUserStatus=="JIE_DU"?"社区戒毒":
            personData.drugUserStatus=="KANG_FU"?"社区康复":
            personData.drugUserStatus=="QIANG_ZHI_JIE_DU"?"强制戒毒":
            personData.drugUserStatus=="FU_XING"?"服刑":
            personData.drugUserStatus=="SHI_LIAN"?"失联":''
          }}
        </view>
      </u-form-item>
      <u-form-item label="风险等级" borderBottom>
        <view class="font-right">{{personData.riskLevel=="GFX"?'高风险':personData.riskLevel=="ZFX"?'中风险':personData.riskLevel=="DFX" ? '低风险': '超高风险'}}</view>
      </u-form-item>
      <u-form-item label="积分" borderBottom @click="goChange" v-if="userInfor.userTypeEnum=='禁毒中队'">
        <view class="font-right text-right">
          <view style="margin-right:12rpx">{{personData.point || 0}}</view>
          <view >
            <u-icon name="play-right-fill" color="#909399" size="14"></u-icon>
          </view>
        </view>
      </u-form-item>
      <u-form-item label="积分" borderBottom v-else>
        <view class="font-right text-right">
          <view style="margin-right:12rpx">{{personData.point || 0}}</view>
        </view>
      </u-form-item>
    </u--form>
  </view>
</template>
<script>
import {getUserByid} from '@/api/montageApi'
export default {
  data() {
    return {
      show: 1,
      personData: {},
      id:'',
      userInfor:{},
    };
  },
  onLoad(option){
    // console.log(option);
    // const query = this.$route.query
    this.userInfor = uni.getStorageSync('userInfor')
    this.id = option.id
    this.getUser(option.id)
  },
  onShow(){
    this.getUser(this.id)
  },
  methods: {
   
    goChange(){
      uni.navigateTo({
        url: '/pagesPack1/personMange/pointChange?id=' + this.personData.userid
      })
    },
    getUser(id){
      getUserByid(id).then(res=>{
        this.personData = res.data || {}
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.text-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}
.form {
  padding: 30rpx 30rpx 0 30rpx;
  background: #f9fafa;
  font-size: 32rpx;
  .font-right {
    width: 100%;
    text-align: right;
    color: #666666;
  }
  ::v-deep .uni-input-input {
    text-align: right;
    color: #666666;
  }
  .apply {
    width: 220rpx;
    height: 68rpx;
    background: #205ba9;
    border-radius: 32rpx;
    color: #ffffff;
    margin-top: 263.33rpx;
  }
}
</style>