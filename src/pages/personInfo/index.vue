<template>
  <view class="form">
    <u--form
      labelPosition="left"
      :model="personData"
      ref="uForm"
      label-width="100"
    >
      <u-form-item label="姓名" prop="personData.name" borderBottom ref="name">
        <u--input v-model="personData.name" border="none"></u--input>
      </u-form-item>
      <u-form-item label="年龄" prop="personData.age" borderBottom ref="age">
        <u--input v-model="personData.age" border="none"></u--input>
      </u-form-item>
      <u-form-item
        label="住址"
        prop="personData.residence"
        borderBottom
        ref="adress"
        @click="pickerShow = true"
      >
        <u-icon
						slot="right"
						name="arrow-right"
				></u-icon>
        <!-- <u--input v-model="personData.adress" border="none"></u--input> -->
      </u-form-item>
      <u-form-item label="户口所在地" prop="personData.censusRegister" borderBottom ref="censusRegister">
        <u--input v-model="personData.censusRegister" border="none"></u--input>
      </u-form-item>
      <u-form-item
        label="手机"
        prop="personData.telephone"
        borderBottom
        ref="telephone"
      >
        <u--input v-model="personData.telephone" border="none"></u--input>
      </u-form-item>
      <u-form-item
        label="身份证"
        prop="personData.idCard"
        borderBottom
        ref="idCard"
      >
        <u--input v-model="personData.idCard" border="none"></u--input>
      </u-form-item>
      <template v-if="userInfor.userTypeEnum == '吸毒人员'">
        <u-form-item
          label="驾驶证"
          prop="personData.driveLicense"
          borderBottom
          ref="driveLicense"
        >
          <u--input v-model="personData.driveLicense" border="none"></u--input>
        </u-form-item>
        <u-form-item
          label="车辆信息"
          prop="personData.vehicleInformation"
          borderBottom
          ref="carInfo"
        >
          <u--input
            v-model="personData.vehicleInformation"
            border="none"
          ></u--input>
        </u-form-item>
      </template>
      <u-form-item>
        <u-button
          type="primary"
          size="small"
          shape="circle"
          text="申请修改"
          @click="rightClick"
        ></u-button>
      </u-form-item>
    </u--form>
    <u-picker :show="pickerShow" :columns="[province,city,area]" keyName="province" ref="uPicker" @change="changeHandler"></u-picker>
    <u-notify ref="uNotify"></u-notify>
  </view>
</template>
<script>
import { getUserByid } from '@/api/montageApi';
// import cityList from '@/utils/ChinaCitys.json'
export default {
  data() {
    return {
      show: 1,
      personData: {
        
      },
      id:1,
      // city:[cityList,cityList[0].citys,cityList[0].citys[0].areas],
      province:[],
      city:[],
      area:[],
      userInfor:[],
      pickerShow: false,
    };
  },
  onLoad(){
    this.getUserInfo()
    this.userInfor = uni.getStorageSync('userInfor')
    this.province = cityList
    this.city = cityList[0].citys
    this.area = cityList[0].citys[0].areas
  },
  methods: {
    getUserInfo(){
      let userInfor = uni.getStorageSync('userInfor')
      getUserByid(userInfor.userId).then(res => {
        this.personData = res.data
      })
    },
    rightClick() {
      let params = {
       operatorId: this.personData.userid,
       id: this.personData.id,
       residence: this.personData.residence,
       driveLicense: this.personData.driveLicense,
       vehicleInformation: this.personData.vehicleInformation,
       operatorId: this.personData.userid,
       name: this.personData.name,
       age: this.personData.age,
       telephone: this.personData.telephone,
       idCard: this.personData.idCard,
       censusRegister: this.personData.censusRegister
      }
      this.$service.personMange.updateInfo(params).then((res) => {
        if (res.code == 200) {
          this.$refs.uNotify.show({
            type: "success",
            message: "您的申请已发送",
            duration: 1000 * 3,
            safeAreaInsetTop: true,
          });
        }
        // console.log(res);
      });
    },
    changeHandler(e) {
      const {
        columnIndex,
        index,
        indexs,
        // 微信小程序无法将picker实例传出来，只能通过ref操作
        picker = this.$refs.uPicker
      } = e
      if (columnIndex === 0) {
        this.city = this.province[index].citys
        this.area = this.province[index]?.citys[indexs[1]]?.areas || this.province[index].citys[0].areas
      }
      if (columnIndex === 1) {
        this.area = this.city[index].areas
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.form {
  padding: 30rpx 30rpx 0 30rpx;
  background: #f9fafa;
  font-size: 32rpx;
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