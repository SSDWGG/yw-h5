<template>
  <view class="container">

    <view class="line1">
      团队人数：{{ allPersonNum }} 人
    </view>

    <view class="line2">
      <view class="left">
        团队总业绩（元）
      </view>
      <view class="right">
        {{ yjPrice }}
      </view>
    </view>
    <view class="line3">
      <view class="header">
        <view :class="['left', activeIndex === 0 ? 'active' : '']" @click="activeIndex = 0">
          成员当天业绩
        </view>
        <view :class="['right', activeIndex === 1 ? 'active' : '']" @click="activeIndex = 1">
          成员总业绩
        </view>
      </view>
      <view class="list">
        <view class="item" v-for="(item, index) in list" :key="index">
          <view class="index" >
            {{ index + 1 }}

          </view>
          <view class="name" >
            {{ item.name }}
          </view>
          <view class="price" >
            ￥{{ item.price }}
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
      allPersonNum: 50,
      yjPrice: 123123,
      activeIndex: 0,
      list: [{
        name: '赵二虎',
        price: 200
      }, {
        name: '赵二虎',
        price: 200
      }, {
        name: '赵二虎',
        price: 200
      }, {
        name: '赵二虎',
        price: 200
      }, {
        name: '赵二虎',
        price: 200
      }, {
        name: '赵二虎',
        price: 200
      }]

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

  .line1 {
    color: rgba(102, 102, 102, .6);
    font-size: 14px;
    margin-bottom: 14px;
  }

  .line2 {
    padding: 10px 16px;
    border-radius: 10px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .left {
      color: #666666;
      font-size: 14px;
      font-weight: 500;

    }

    .right {
      color: #B1771A;
      font-size: 30px;
      font-weight: 500;
      font-family: Source Han Serif CN-SemiBold;
    }

  }

  .line3 {
    background-color: #FFFFFF;
    border-radius: 10px;

    .header {

      padding-top: 17px;
      border-bottom: 1px solid rgba(70, 41, 6, .1);
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding-bottom: 0px;
      font-size: 14px;
      color: #666666;
      font-weight: 500;

      .left {

        padding-bottom: 16px;
      }

      .right {


        padding-bottom: 16px;

      }

      .active {
        border-bottom: 2px solid #B1771A;
        color: #B1771A;
      }
    }

    .list {
      padding: 18px 16px;
      background-color: #FFFFFF;
      border-radius: 10px;

      .item {
        display: flex;
        color: #666666;
        font-size: 14px;
        margin-bottom: 12px;

        .index{
          width: 30px;
          color: #462906;
        }
        .name {
          flex: 1;
        }

        .price {}
      }
    }
  }

}
</style>
