<template>
  <view class="container">
    <view class="card" v-for="(item,index) in tableData" :key="index">
      <Card :isShadow="true">
        <view class="flex-between">
          <view class="title">
            {{
              item.taskType=='XDRYHC'?'吸毒人员核查':
              item.taskType=='LVZSHC'?'旅馆住宿核查':
              item.taskType=='SCNJJG'?'上传尿检结果':
              item.taskType=='QD'?'签到':''
            }}</view>
          <view class="ckxq" @click="goDetail(item)">查看详情</view>
        </view>
        <!-- <view style="margin-top:20rpx"><text class="font-blod">任务名称：</text>下大萨达</view> -->
        <view style="margin-top:20rpx"><text class="font-blod">人员：</text>{{item.promoterName || ''}}</view>
        <view><text class="font-blod">时间：</text>{{item.createTime||''}}</view>
        <view><text class="font-blod">任务内容：</text>{{item.note||''}}</view>
      </Card>
    </view>
    <view class="more" @click="loadingMore">
      <u-loadmore :status="loadStatus" height="50" :line="true" />
    </view>
  </view>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  components: {
    Card
  },
  data(){
    return {
      loading:'',
      tableData:[],
      userInfor:{},
      form:{
        pageSize:10,
        pageNum:1,
        taskStatus: 'CREATE'
      }
    }
  },
  onLoad(option){
    this.userInfor = uni.getStorageSync('userInfor')
  },
  onShow(){
    this.getList()
  },
  methods:{
    getList(){
      this.loadStatus = 'loading'
      this.form = {
        pageSize:10,
        pageNum:1,
        taskStatus: 'CREATE',
        receiverUserid:this.userInfor.userId
      }
      if(this.userInfor.userTypeEnum != '禁毒中队') {
        this.form.receiverUserid = this.userInfor.userId
      }
      this.$service.pushTask.getTaskList(this.form).then(res=>{
        if(res.code== 200) {
          this.tableData = res.data.content || []
          if((res.data.number+1)*res.data.size>=res.data.totalElements) {
            this.loadStatus = 'nomore'
          } else {
            this.loadStatus = 'loadmore'
          }
        }
      })
    },
    loadingMore(){
      if(this.loadStatus != 'nomore') {
        this.form.pageNum++
        this.loadStatus = 'loading'
        this.$service.pushTask.getTaskList(this.form).then(res=>{
          if(res.code == 200) {
            this.tableData.push(...res.data.content)
            if((res.data.number+1)*res.data.size>=res.data.totalElements) {
              this.loadStatus = 'nomore'
            } else {
              this.loadStatus = 'loadmore'
            }
          }
        })
      }
    },
    goDetail(item){
      uni.navigateTo({
        url: "/pages/todoAgency/detail?id="+item.id +'&&taskStatus='+item.taskStatus
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx 30rpx 0 30rpx;
  position: relative;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
margin-bottom: 20rpx;
  .title {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 30rpx;
    padding-left: 14rpx;
    border-left: 10rpx solid #3c9cff;
  }
  .ckxq {
    color: #3c9cff;
    cursor: pointer;
    font-size: 30rpx;
  }
  .font-blod {
    font-weight: 600;
    font-size: 30rpx;
  }
}
</style>