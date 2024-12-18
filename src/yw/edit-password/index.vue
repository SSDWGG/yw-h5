<template>
  <view class="container">

    <view class="block">

      <view class="item">
        <view class="lable" hover-class="none" hover-stop-propagation="false">
          收货人
        </view>
        <view class="content" hover-class="none" hover-stop-propagation="false">
          <u-input v-model="form.receiver" placeholder="请输入收货人" />

        </view>
      </view>
      <view class="item">
        <view class="lable" hover-class="none" hover-stop-propagation="false">
          手机号码
        </view>
        <view class="content" hover-class="none" hover-stop-propagation="false">
          <u-input v-model="form.receiver" placeholder="请输入手机号码" />

        </view>
      </view>
      <view class="item">
        <view class="lable" hover-class="none" hover-stop-propagation="false">
          所在地区
        </view>
        <view class="content" hover-class="none" hover-stop-propagation="false">
          <u-input v-model="form.receiver" placeholder="请输入所在地区" />

        </view>
      </view>
      <view class="item last">
        <view class="lable" hover-class="none" hover-stop-propagation="false">
          详细地址
        </view>
        <view class="content" hover-class="none" hover-stop-propagation="false">
          <u-textarea v-model="form.receiver" placeholder="请输入详细地址" />

        </view>
      </view>
    </view>
    <view class="add-footer">
      <view class="btn">保存</view>
    </view>

  </view>
</template>

<script>

export default {

  data() {
    return {
      form: {
        receiver: ''
      }
    };
  },

  methods: {

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
    .last{
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
