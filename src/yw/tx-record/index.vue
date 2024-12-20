<template>
  <view class="container">


    <view class="line3">

      <view class="list">
        <view class="item" v-for="(item, index) in list" :key="index">
          <view class="time" >
            {{ item.time }}

          </view>
          <view class="content" >
            {{ item.content }}
          </view>

        </view>

      </view>
    </view>
  </view>
</template>

<script>

export default {

  data() {
    return {

      list: [{
        time: '2024.12.01 20:00:00',
        content: '我提现了100元'
      }, {
        time: '2024.12.01 20:00:00',
        content: '我提现了100元'
      }, {
        time: '2024.12.01 20:00:00',
        content: '我提现了100元'
      }, {
        time: '2024.12.01 20:00:00',
        content: '我提现了100元'
      }, {
        time: '2024.12.01 20:00:00',
        content: '我提现了100元'
      },]

    };
  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  background: #F4F3F2;
  height: 100vh;
  box-sizing: border-box;



  .line3 {
    background-color: #FFFFFF;
    border-radius: 10px;



    .list {
      padding: 15px 16px;
      background-color: #FFFFFF;
      border-radius: 10px;

      .item {
        display: flex;
        color: #666666;
        font-size: 14px;
        margin-bottom: 12px;

        .time {

          color: #999999;
        }

        .content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: #222222;
        }


      }
    }
  }

}
</style>
