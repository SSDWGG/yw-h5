<template>
  <view class="container">


    <view class="line3">

      <view class="list" v-if="list.length>0">
        <view :class="['item',index===list.length-1?'last':'']" v-for="(item, index) in list" :key="index">
          <view class="left" >
            <view class="time" >
              {{ item.createTime }}
            </view>
            <view class="tip" >
              {{ item.title }}
            </view>
          </view>
          <view class="content" >
           帮我收益 <span>{{ item.number }}</span>元
          </view>

        </view>

      </view>
      <view class="empty" v-else>
      <img src="@/static/yw/emptyCar.png" />
      <view class="txt">
        暂无收益记录~
      </view>
    </view>
    </view>
  </view>
</template>

<script>
import { getAppIncome } from '@/api/info'

export default {

  data() {
    return {

      list: []

    };
  },
  created() {
    getAppIncome().then((res) => {
      this.list = res.rows
      console.log( this.list);

    })

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

    .empty{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 100px;
    img{
      width: 130px;
      height: 130px;
    }
    .txt{
      color: #C5C5C5;
      padding-top: 14px;
    }
  }

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
