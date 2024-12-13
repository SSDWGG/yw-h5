<template>
  <view class="container">
    <view class="flex">
      <view class="uinput" @click="show1 = true">
        <u--input
          placeholder="风险等级"
          suffixIcon="arrow-down-fill"
          disabled
          v-model="fxdj.value"
          suffixIconStyle="color: #909399;font-size:28rpx;text-align:center"
        ></u--input>
      </view>
      <view class="uinput" @click="handlepcs" v-if="userInfor.userTypeEnum=='禁毒中队'">
        <u--input
        placeholder="户籍派出所"
        disabled
        v-model="hjpcs.value"
        suffixIcon="arrow-down-fill"
        suffixIconStyle="color: #909399;font-size:28rpx;text-align:center"
      ></u--input>
      </view>
      <view class="uinput" @click="show3 = true">
        <u--input
          placeholder="人员状态"
          disabled
          v-model="ryzt.value"
          suffixIcon="arrow-down-fill"
          suffixIconStyle="color: #909399;font-size:28rpx;text-align:center"
        ></u--input>
      </view>
      <view class="uinput jf" @click="handlePx" v-if="userInfor.userTypeEnum == '禁毒中队'">
      <view class="wb">积分排序</view>
      <view v-if="flag"><i class="iconfont icon-paixusheng"></i></view>
      <view v-if="!flag"><i class="iconfont icon-paixu-jiang"></i></view>
      </view>
    </view>
    <view class="uinput alone" >
      <view  @click="pickerShow = true">
      <u--input
        placeholder="居住地"
        suffixIcon="arrow-down-fill"
        disabled
        v-model="form.jzd"
        suffixIconStyle="color: #909399;font-size:28rpx"
       
      ></u--input>
    </view>
      <!-- <u-icon name="close-circle" class="closeIcon" size="20" @click="handleClose" ></u-icon> -->

    </view>
    <!-- <view style="margin-top:20rpx">
      <u-button type="primary" text="确定" @click="getData"></u-button>
    </view> -->
    <view class="content">
      <view class="card-box" v-for="(item,index) in tableData" :key="index" @click="hangleDetail(item)">
        <card :isShadow="true">
          <view class="box_row1">
            <view class="flex1">
              <img :src="!!item.sysUser.avatar?location.locatioUrl+item.sysUser.avatar:require('@/static/icon/头像.png')" style="width:120rpx;height:120rpx" alt="">
              <view style="margin-top:20rpx">
                <u-button size="mini" :type="item.riskLevel == 'GFX' ? 'error' : item.riskLevel == 'ZFX' ? 'warning' : 'primary'">
                  {{ item.riskLevel == 'GFX' ? '高风险' : item.riskLevel == 'ZFX' ? '中风险' : '低风险' }}
                </u-button></view>
            </view>
            <view style="margin-left:36rpx">
              <p>
                <text class="name">{{item.name}}</text>
                <text class="zt">({{item.drugUserStatus | newStatus}})</text></p>
              <p>手机号码：{{ !!item.telephone?item.telephone:''}}</p>
              <p>户籍派出所: {{item.localPoliceStation}}</p>
              <p>积分: {{item.point}}</p>
            </view>
          </view>
        </card> 
      </view>
      <view class="more" @click="loadingMore">
        <u-loadmore :status="loadStatus" height="50" :line="true" />
      </view>
    </view>
    <u-picker :show="show1" :columns="fxdjList" keyName="label" @confirm="confirm1" @cancel="show1=false"></u-picker>
    <u-picker :show="show2" :columns="pcsList" keyName="label" @confirm="confirm2" @cancel="show2=false"></u-picker>
    <u-picker :show="show3" :columns="ryztList" keyName="label" @confirm="confirm3" @cancel="show3=false"></u-picker>
    <u-picker :show="pickerShow" :columns="[province,city,area]" keyName="province" ref="uPicker" @change="changeHandler" @confirm="pickerConfirm" @cancel="handleClose"></u-picker>
  </view>
</template>

<script>
import Card from '@/components/Card.vue'
import cityList from '@/pagesPack1/common/ChinaCitys.json'
import location from '@/utils/locationUrl'

export default {
  components:{
    Card
  },
  data(){
    return {
      location,
      form:{
        pageSize:10,
        pageNum:1,
        jzd:'',
      },
      flag:false,
      tableData:[
        // {}
      ],
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      fxdj:{value:'',id:''},
      hjpcs:{value:'',id:''},
      ryzt:{value:'',id:''},
      fxdjList: [
        [
        {label:'取消选择'},
        {label:'超高风险',id:'CGFX'},
        {label:'高风险',id:'GFX'},
        {label:'中风险',id:'ZFX'},
        {label:'低风险',id:'DFX'},
        ]
      ],
      pcsList: [],
      ryztList: [
        [
        {label:'取消选择'},
        {label:'未复吸',id:'WEI_FU_XI'},
        {label:'社区戒毒',id:'JIE_DU'},
        {label:'社区康复',id:'KANG_FU'},
        {label:'强制戒毒',id:'QIANG_ZHI_JIE_DU'},
        {label:'服刑',id:'FU_XING'},
        {label:'失联',id:'SHI_LIAN'},]
      ],
      loadStatus: 'loadmore',
      userInfor:{},
      province:[],
      city:[],
      area:[],
      pickerShow:false,
    }
  },
  onLoad(){
    this.userInfor = uni.getStorageSync('userInfor')
    this.province = cityList
    this.city = cityList[0].citys
    this.area = cityList[0].citys[0].areas
    // console.log(this.userInfor);
    this.getData()
  },
  onShow(){
    this.getData()
  },
  filters:{
    newStatus(val){
     if (val == 'WEI_FU_XI') {
       return val = '未复吸'
     }else if (val == 'JIE_DU') {
       return val = '社区戒毒'
     }else if (val == 'KANG_FU') {
       return val = '社区康复'
     }else if (val == 'QIANG_ZHI_JIE_DU') {
       return val = '强制戒毒'
     }else if (val == 'FU_XING') {
       return val = '服刑'
     }else{
      return val = '失联'
     }
    }
  },
  methods:{
    // 获取列表信息
    getData(){
      if(this.userInfor.userTypeEnum == '地方派出所'){
        this.hjpcs.value = this.userInfor.dept.deptName
      }
      let params = {
        ...this.form,
        localPoliceStation: this.hjpcs.value, // 派出所
        drugUserStatus: this.ryzt.id, // 状态
        riskLevel: this.fxdj.id, // 风险等级
        userTypeEnum:'吸毒人员',
        sort:'asc'
      }
      if (this.hjpcs.value == '') delete params.localPoliceStation;
      this.loadStatus = 'loading'
      this.$service.personMange.getxdryList(params).then(res=>{
        if(res.code == 200) {
          this.tableData = res.data.content || []
          if((res.data.number + 1) * res.data.size>=res.data.totalElements) {
            this.loadStatus = 'nomore'
          } else {
            this.loadStatus = 'loadmore'
          }
        }
      })
    },
    // 加载更多
    loadingMore(){
      if(this.loadStatus != 'nomore') {
        this.form.pageNum++
        this.loadStatus = 'loading'
        let params = {
          ...this.form,
          localPoliceStation: this.hjpcs.label, // 派出所
          drugUserStatus: this.ryzt.id, // 状态
          riskLevel: this.fxdj.id, // 风险等级
        }
        this.$service.personMange.getxdryList(params).then(res=>{
          if(res.code == 200) {
            this.tableData.push(...res.data.content)
            if((res.data.number + 1) * res.data.size>=res.data.totalElements) {
              this.loadStatus = 'nomore'
            } else {
              this.loadStatus = 'loadmore'
            }
          }
        })
      }
    },
    // 人员详情
    hangleDetail(item){
      uni.navigateTo({
        url: '/pagesPack1/personMange/personDetail?id=' + item.userid
      })
    },
    confirm1(value){
      uni.hideKeyboard();
      // console.log(value);
      this.fxdj.value = value.value[0].label=='取消选择'?'':value.value[0].label
      this.fxdj.id = value.value[0].label=='取消选择'?'':value.value[0].id
      // console.log(this.fxdj);
      this.show1 = false
      this.getData()
    },
    confirm2(value){
      // console.log(value);
      this.hjpcs.value = value.value[0].label=='取消选择'?'':value.value[0].label
      this.hjpcs.id = value.value[0].label=='取消选择'?'':value.value[0].id
      this.show2 = false
      this.getData()
    },
    confirm3(value){
      // console.log(value);
      this.ryzt.value = value.value[0].label=='取消选择'?'':value.value[0].label
      this.ryzt.id = value.value[0].label=='取消选择'?'':value.value[0].id
      
      this.show3 = false
      this.getData()
    },
    changeHandler(e){
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
    },
    pickerConfirm(e){
      const {value} = e
      this.form.provinceName = value[0].province
      this.form.cityName = value[1].province
      this.form.districtName = value[2].province
      this.form.jzd =  value[0].province + value[1].province + value[2].province
      this.pickerShow = false
       this.getData()
    },
    hideKeyBorder(e){
      uni.hideKeyboard();
    },
    // 积分排序
    handlePx(){
       if (this.flag) {
            this.tableData.sort((a,b) => {
              return b.point - a.point
            })
       }else{
        this.tableData.sort((a,b) => {
          return a.point - b.point
        })
       }
       this.flag = !this.flag
    },
    // 选择派出所
    handlepcs(){
      this.show2 = true
      this.$service.pushTask.chosePcs().then((e) => {
        if (e.code == 200) {
          this.pcsList = [[{label:'取消选择'},...this.filterArr(e.data)]];
        }
      });
    },
    // 将子级部门过滤成同级
    filterArr(arr) {
      let newArr = [];
      arr.map((e) => {
        newArr.push({ label: e.label, id: e.id });
        if (e.children) {
          let arr2 = this.filterArr(e.children);
          newArr.push(...arr2);
        }
      });
      return newArr;
    },
    handleClose(){
      delete this.form.provinceName 
      delete this.form.cityName 
      delete this.form.districtName 
      delete  this.form.jzd 
      this.pickerShow = false
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .container {
  padding: 30rpx 30rpx 0 30rpx;
  .u-input__content__field-wrapper__field {
  font-size: 28rpx !important;
}
.uni-input-wrapper{
  font-size: 24rpx !important;
}
}
.flex {
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  // flex-wrap: wrap;
}
::v-deep .flex1{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30rpx;
  .u-button--plain.u-button--warning{
    color: #f9ae3d;
  }
}
.alone {
  // width: calc(100% - 60rpx) !important;
  width: 400rpx !important;
  padding: 0 30rpx;
  text-align: left !important;
  display: flex;
  align-items: center;
  ::v-deep .u-icon{
    margin-left: 20rpx;
  }
}
::v-deep.uinput {
  width: 100%;
  margin: 0 6rpx;
  text-align: center;
  .u-border {
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    background-color:#F8F9F9 !important;
    padding: 12rpx 4rpx !important;
  }
  .u-input__content__field-wrapper__field{
    font-size: 25rpx !important;
    // text-align: center !important;
  }
}

.jf{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 28rpx;
  line-height: 36rpx;
  .wb{
    color: rgb(144, 147, 153);
    margin-right: 1rpx;
  }
}
.ubutton {
  width: 50%;
}
.content{
  margin-top: 30rpx;
  padding: 0 30rpx;
  .card-box{
    margin-bottom: 30rpx;
    position: relative;
    .box_row1 {
      display: flex;
      align-items: flex-start;
      // justify-content: space-between;
      .time {
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(0,0,0,0.5);
      }
      .name{
        font-size: 28rpx;
        font-weight: bold;
        margin-right: 10rpx;
      }
      .zt{
        color:#3c9cff ;
        font-size: 24rpx;
      }
    }
    .box_title {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      img {
        width: 50rpx;
        height: 50rpx;
        margin-right: 20rpx;
      }
    }
    .btnBox {
      display: flex;
      margin-top: 40rpx;
      justify-content: flex-end;
    }
  }
}
</style>