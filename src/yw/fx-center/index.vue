<template>
  <view class="container">

    <view class="bgcolor" />
    <img class="titleBg" src="@/static/yw/fx/bg.png">

    <view class="allprice">
      <view class="num">
        {{ obj.brokeragePrice }}
      </view>
      <view class="txt">
        总收益
      </view>
    </view>

    <view class="modeView">

      <view class="content">
        <view class="contentItem">
          <view class="icon">
            ￥{{ obj.balance }}
          </view>
          <view class="name">
            可提现金额
          </view>
        </view>
        <view class="txbtn" @click="toTxPage">
          提现
        </view>
      </view>
    </view>

    <view class="modeView">

      <view class="content">
        <view class="contentItem">
          <view class="icon">
            ￥{{ obj.todayBrokerage }}
          </view>
          <view class="name">
            今日收益
          </view>
        </view>
        <view class="contentItem">
          <view class="icon">
            ￥{{ obj.todaySubOrderCount }}
          </view>
          <view class="name">
            今日订单
          </view>
        </view>
        <view class="contentItem">
          <view class="icon">
            ￥{{ obj.todaySubUserCount }}
          </view>
          <view class="name">
            今日新增客户
          </view>
        </view>
      </view>
    </view>
    <view class="modeView">

      <view class="content">
        <view class="contentItem" v-for="(item, index) in typeList" :key="index" @click="item.request()">
          <view class="icon">
            <img class="iconImg" :src="item.icon">
          </view>
          <view class="name">
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>

    <view class="tip">
      <view class="title">
        分销须知：
      </view>
       <view class="item">
        金粉：首次购买6提，可获得15%的推荐奖励，复购限6提/月；
      </view>
      <view class="item">
        金创：首次购买12提，可获得18%的推荐奖励，复购限20提/月，复购奖励2元/盒，可累计晋升机制；
      </view>
      <view class="item">
        金代：首次购买30提，可获得24%的推荐奖励，复购限45提/月，复购奖励3元/盒，小区累计1万可晋升下一级（去除一个最高区）；
      </view>
      <view class="item"> 金总：首次购买102提，可获得30%的推荐奖励，复购限150提/月，
        复购奖励4元/盒，小区累计3.5万可晋升下一级（去除一个最高区）；
      </view>
      <view class="item"> 金尊：可享受股东分红，可获得40%的推荐奖，复购限200提/月，
        复购奖励5元/盒，小区累计35万
      </view>
      <view class="item">代理业绩月分红比：20万可分红1%；20-50万可分红3%；50-100万可分红5%；100-200万可分红8%

      </view>
      <view class="item"> 复购业绩月分红比：20万可分红1%；20-50万可分红3%；50-100万可分红5%；100-200万可分红8%

      </view>




    </view>

  </view>
</template>

<script>
import { getBrokerageCenter } from '@/api/info'

export default {

  data() {
    return {
      obj: {},
      typeList: [
        {
          name: '我的团队',
          icon: require("@/static/yw/fx/1.png"),
          request: () => { uni.navigateTo({ url: '/yw/fx-mytd/index' }) }
        },
        {
          name: '收益明细',
          icon: require("@/static/yw/fx/2.png"),
          request: () => { uni.navigateTo({ url: '/yw/tx-detail/index' }) }
        },
        {
          name: '提现记录',
          icon: require("@/static/yw/fx/3.png"),
          request: () => { uni.navigateTo({ url: '/yw/tx-record/index' }) }
        },
        {
          name: '邀请用户',
          icon: require("@/static/yw/fx/4.png"),
          request: () => { uni.navigateTo({ url: '/yw/fx-mytgm/index' }) }
        },
      ],
    };
  },
  created() {
    getBrokerageCenter().then((res) => {
      this.obj = res.data
    })

  },
  methods: {
    toTxPage() {
      uni.navigateTo({ url: '/yw/tx/index' })
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  .bgcolor {
    background: #F4F3F2;
    z-index: -2;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }

  .titleBg {
    width: 100vw;
    position: absolute;
    top: -100px;
    left: 0;
    z-index: -1;
  }

  .allprice {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
    color: #fff;
    flex-direction: column;

    .num {
      font-size: 40px;
      font-weight: 600;
    }

    .txt {
      font-size: 18px;
      font-weight: 400;
    }
  }

  .modeView {
    margin: 16px 16px;
    border-radius: 10px;
    background-color: #fff;



    .content {
      padding: 20px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .contentItem {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .icon {
          width: 41px;
          height: 41px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          // background: linear-gradient(to bottom, #D3AC85, #C39963);

          color: #B1771A;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: -1px;

          .iconImg {
            width: 41px;
            height: 41px;
          }
        }

        .name {
          margin-top: 10px;
          color: #666666;
          font-size: 14px;
        }
      }

      .txbtn {
        border-radius: 5px;
        background-color: #EF432A;
        color: #fff;
        padding: 5px 17px;
      }
    }
  }

  .tip {
    margin-top: 36px;
    padding: 0 16px;
    padding-bottom: 50px;

    .title {
      color: rgba(70, 41, 6, .6);
      margin-bottom: 16px;
      font-size: 14px;
      font-weight: 500;
    }

    .item {
      color: rgba(70, 41, 6, .5);
      margin-bottom: 16px;
      font-size: 12px;

    }
  }

}
</style>
