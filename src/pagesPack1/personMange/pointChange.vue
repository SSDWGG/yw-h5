<template>
  <view class="container">
    <view class="form">
      <u--form
      labelPosition="left"
      :model="personData"
      ref="uForm"
      label-width="100"
    >
      <u-form-item label="姓名" borderBottom>
        <view class="font-right">{{personData.name}}</view>
      </u-form-item>
      <u-form-item label="积分" borderBottom>
        <view class="font-right">{{personData.point || 0}}</view>
      </u-form-item>
      <u-form-item borderBottom>
         <view>
            <!-- <u-checkbox-group
                v-model="checkboxValue1"
                placement="column"
                @change="checkboxChange"
            >
                <u-checkbox
                    :customStyle="{marginBottom: '8px'}"
                    v-for="(item, index) in checkboxList1"
                    :key="index"
                    :label="item.name"
                    :name="item.name"
                >
                </u-checkbox>
            </u-checkbox-group> -->
            <u-radio-group
              v-model="checkboxValue"
              placement="column"
              @change="checkboxChange"
            >
              <u-radio
                :customStyle="{marginBottom: '8px'}"
                v-for="(item, index) in checkboxList"
                :key="index"
                :label="item.name"
                :name="index"
              >
              </u-radio>
            </u-radio-group>
        </view>
      </u-form-item>
      <u-form-item>
        <u-button class="apply" @click="pointChange">提交</u-button>
      </u-form-item>
    </u--form>
    </view>

    <u-notify message="Hi uView" ref="uNotify"></u-notify>
    <u-modal :show="show" title="变更积分" content='确认变更积分' showCancelButton @cancel="show=false" @confirm='confirm'></u-modal>
  </view>
</template>

<script>
import {getUserByid} from '@/api/montageApi'
export default {
  data(){
    return {
      personData:{},
      checkboxValue:'',
      changeRadio:{},
      drugUserid:'',
      show:false,
      checkboxList:[
        {name:'连续一周不签到加10分', key:'LXYZBQD'},
        {name:'不如实报告现住址加10分', key:'BRSBGXZZ'},
        {name:'通联不上一次加10分', key:'TLBSYC'},
        {name:'超过六个月未毛发检测加20分', key:'CGLGYWMFJC'},
        {name:'吸毒检测抽检不到加30分', key:'XDJCCJBD'},
        {name:'频繁出入高风险地区加20分', key:'PFCRGFXDQ'},
        {name:'吸毒人员同住加20分', key:'XDRYTZ'},
        {name:'驾驶员注销人员驾驶机动车加40分', key:'JSYZXRYJSJDC'},
        {name:'家庭成员报告异常加10分', key:'JTCYBGYC'},
        {name:'涉及其他违法犯罪加30分', key:'SJQTWFFZ'},
        {name:'主动赴公安机关毛发检测减40分', key:'ZDFGAJGMFJC'},
        {name:'主动赴公安机关尿检（外地的上传尿检报告）减20分', key:'ZDFGAJGNJ'},
        {name:'主动签到并报告出行行程减10分', key:'ZDJQBBGCXXC'},
        {name:'主动上传近一个月本人微信和支付宝交易记录减10分', key:'ZDSCJYGYBRWXHZFBJYJL'},
      ],
      userInfor:{},
    }
  },
  onLoad(option){
    // console.log(option);
    // const query = this.$route.query
    this.userInfor = uni.getStorageSync('userInfor')
    // console.log(this.userInfor);
    this.drugUserid = option.id
    this.getUser(option.id)
    
  },
  methods:{
    checkboxChange(val){
      // console.log(this.checkboxValue,val);
      this.changeRadio = this.checkboxList[val]
    },
    getUser(id){
      getUserByid(id).then(res=>{
        this.personData = res.data || {}
      })
    },
    pointChange(){
      if(this.checkboxValue == '') {
        this.$refs.uNotify.show({
          type: 'warning',
          message: '请选择基本变更条目',
          duration: 1000 * 3,
          safeAreaInsetTop:true
        })
        return false
      }
      this.show = true
    },
    confirm(){
      let params = {
        drugUserid: this.personData.userid,
        operateUserid: this.userInfor.userId,
        operateName: this.userInfor.nickName,
        pointRule: this.changeRadio.key,
        content: this.changeRadio.name
      }
      this.$service.pushTask.pointDel(params).then(res=>{
        if(res.code == 200) {
          this.$refs.uNotify.show({
            type: 'success',
            message: '变更成功！',
            duration: 1000 * 3,
            safeAreaInsetTop:true
          })
          this.personData.point = res.data.point
          this.show = false
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx 30rpx 0 30rpx;
}
::v-deep.form {
  padding: 30rpx 30rpx 0 30rpx;
  background: #f9fafa;
  font-size: 32rpx;
  .u-radio {
    margin-top: 30rpx;
  }
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