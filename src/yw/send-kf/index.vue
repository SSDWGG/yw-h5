<template>
  <view class="container">

    <view class="block">

      <view class="item">
        <view class="lable">
          留言
        </view>
        <view class="content">
          <u-textarea v-model="userContent" placeholder="请输入你想说的话" />

        </view>
      </view>
   

    </view>
    <view class="add-footer">
      <view class="btn" @click="send">发送</view>
    </view>

  </view>
</template>

<script>
import { postLY } from '@/api/info'

export default {
  data() {
    return {
      userContent:'',
    };
  },
  methods: {
    send(){
      postLY({
        userContent:this.userContent
      }).then(res=>{
        console.log(res);
        uni.$u.toast('留言成功')
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 13px 10px;
  background: #F4F3F2;
  height: 100vh;
  box-sizing: border-box;

  .block {
    padding: 12px 16px;
    background-color: #FFFFFF;
    border-radius: 10px;

    .item {
      margin-bottom: 30px;

      .lable {
        color: #999999;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 12px;
        margin-left: 4px;
      }

      .content {}
    }

    .last {
      margin-bottom: 16px;
    }
  }

  .add-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #F4F3F2;
    width: 100%;
    padding: 10px;
    padding-bottom: calc(40px + env(safe-area-inset-bottom));
    box-sizing: border-box;

    .btn {
      background-color: #EF432A;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 500;

      width: 100%;
      height: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;

    }
  }

}
</style>
