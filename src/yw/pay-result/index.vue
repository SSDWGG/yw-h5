<template>
  <view class="container">
    支付成功


  </view>
</template>

<script>
import { getYwUserInfo, editUserInfo } from '@/api/info'

export default {

  data() {
    return {
      userInfo: {},
    };
  },
  created() {
   
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

}
</style>
