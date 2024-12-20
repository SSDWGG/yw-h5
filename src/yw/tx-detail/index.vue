<template>
  <view class="container">


    <view class="line3">

      <view class="list">
        <view :class="['item',index===list.length-1?'last':'']" v-for="(item, index) in list" :key="index">
          <view class="left" >
            <view class="time" >
              {{ item.time }}
            </view>
            <view class="tip" >
              {{ item.content }}
            </view>
          </view>
          <view class="content" >
           帮我收益 <span>{{ item.syPrice }}</span>元
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
        content: 'xxxx卖出100件',
        syPrice:20
      },{
        time: '2024.12.01 20:00:00',
        content: 'xxxx卖出100件',
        syPrice:20
      },{
        time: '2024.12.01 20:00:00',
        content: 'xxxx卖出100件',
        syPrice:20
      },{
        time: '2024.12.01 20:00:00',
        content: 'xxxx卖出100件',
        syPrice:20
      },{
        time: '2024.12.01 20:00:00',
        content: 'xxxx卖出100件',
        syPrice:20
      },{
        time: '2024.12.01 20:00:00',
        content: 'xxxx卖出100件',
        syPrice:20
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
      padding: 16px;
      background-color: #FFFFFF;
      border-radius: 10px;
     

      .item {
        display: flex;
        align-items: flex-end;
        color: #666666;
        font-size: 14px;
        margin-bottom: 16px;
        border-bottom: 0.5px solid rgba(70, 41, 6,.1);

        .left {
          .time{
            color: #999999;
          }
          .tip{
            color: #1D1D1D;
            margin-top: 8px;
          }
         
          margin-bottom: 16px;
        }

        .content {
          margin-bottom: 16px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: #222222;
          span{
            color: #FF4646;
          }
        }


      }
      .last{
        margin-bottom: 0;
        border-bottom: none;
      }
    }
  }

}
</style>
