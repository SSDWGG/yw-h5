<template>
  <view class="ql-editor container">
      <view v-for="(it,index) in form" :key="index" class="nr">
        <view class="title">{{ it.title || '' }}</view>
        <view v-html="it.content" class="content"></view>
      </view>
  </view>
</template>
<script>
export default {
  data(){
    return {
       form:{
        pageSize:10,
        pageNum:1
       },
       loadStatus:'loadmore',
       node:3,
    }
  },
  onShow(){
  },
  onLoad(options){
   if (options) {
    this.form.id = options.id
   }
   this.getList()
  },
  methods:{
   getList(){
    this.loadStatus = 'loading'
    this.$service.pushTask.jdzs(this.form).then((res) => {
          if (res.code == 200) {
            this.form = res.data.content || [];
            if (
              (res.data.number + 1) * res.data.size >=
              res.data.totalElements
            ) {
              this.loadStatus = "nomore";
            } else {
              this.loadStatus = "loadmore";
            }
          }
        });
   }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/static/style/quill.bubble.css';
@import '~@/static/style/quill.core.css';
@import '~@/static/style/quill.snow.css';
::v-deep.container {
  padding: 30rpx 30rpx 0 30rpx;
  background: #f9fafa;
}
.nr{
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  width: 90%;
  margin: 0 auto;
  .title{
    text-align: center;
    font-size: 42rpx;
    font-weight: bold;
  }
}
.content{
  width: 100%;
  margin: 0 auto;
  img{
    width: 100% !important;
  }
}
</style>