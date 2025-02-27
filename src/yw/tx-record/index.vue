<template>
  <view class="container">


    <view class="line3">

      <view class="list"  v-if="list.length>0">
        <view class="item" v-for="(item, index) in list" :key="index">
          <view class="time" >
            {{ item.createTime }}

          </view> 
          <view class="content" >
           提现金额： {{ item.extractPrice }}
          </view>

        </view>

      </view>
      <view class="empty" v-else>
      <img src="@/static/yw/emptyCar.png" />
      <view class="txt">
        暂无提现记录~
      </view>
    </view>
    </view>
  </view>
</template>

<script>
import { getAppExtract } from '@/api/info'

export default {

  data() {
    return {

      list: []

    };
  },
  created() {
    getAppExtract().then((res) => {
      this.list = res.rows
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
