<template>
  <view class="container">

    <view class="bgcolor" />
    <img class="titleBg" src="@/static/yw/fx/bg.png">

    <view class="allprice">
      <view class="txt">
        可提现金额（元）
      </view>
      <view class="num">
        {{ allPrice }}
      </view>

    </view>

    <view class="block">

      <view class="item">
        <view class="lable">
          提现金额
        </view>
        <view class="content">
          <view class="icon">
            ￥
          </view>
          <u-input border="none" v-model="txPrice" fontSize="36px" style=" height: 36px;" />
          <view class="tip" @click="() => { txPrice = allPrice }">
            全部提现
          </view>
        </view>

        <view class="mainInfo">
          <view class="infoItem" @click="() => { show = true }">
            <view class="infoLable">
              提现至
            </view>
            <view class="name">
              {{ !!yhName ? yhName : '请选择银行' }}
            </view>
            <u-icon name="arrow-right" size="14" />

          </view>
        </view>

        <u-button color="#EF432A" text="申请提现" class="btn" @click="handleTx"></u-button>

      </view>


    </view>
    <u-picker keyName="bankName" :show="show" :columns="columns" @confirm="handleConfirmPicker"
      @cancel="handleCalcelPicker"></u-picker>
  </view>
</template>

<script>
import { getBankList, appExtractAdd,getBrokerageCenter } from '@/api/info'

export default {

  data() {
    return {

      allPrice: 0,
      txPrice: null,
      yhName: '',
      show: false,
      columns: [],
      userBankId: ''
    };
  },
  created() {
    getBankList().then((res) => {
      this.columns = [res.data]
    })

    getBrokerageCenter().then((res) => {
      this.allPrice = res.data.balance
    })
  },
  methods: {
    handleTx() {
      if (!this.userBankId) {
        uni.$u.toast('请选择银行');
        return
      }
      if (!!this.txPrice && this.txPrice <= this.allPrice) {
        appExtractAdd({
          userBankId: this.userBankId,
          extractPrice: this.txPrice
        }).then(res=>{
          uni.$u.toast('已发起提现');
        })
      } else {
        uni.$u.toast('金额输入错误');
      }

    },
    handleConfirmPicker(chooseVal) {
      this.yhName = chooseVal.value[0].bankName
      this.userBankId = chooseVal.value[0].userBankId
      this.handleCalcelPicker()
    },
    handleCalcelPicker() {
      this.show = false
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
    justify-content: center;
    align-items: flex-start;
    padding: 70px 16px;
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

  .block {
    padding: 24px 20px;
    background-color: #FFFFFF;
    border-radius: 10px;
    margin: 16px;

    .item {

      .lable {
        color: #666666;
        font-size: 14px;
        margin-bottom: 20px;
        margin-left: 4px;
      }

      .content {
        border-bottom: 1px solid rgba(70, 41, 6, .1);
        padding-bottom: 5px;
        display: flex;
        align-items: flex-end;

        .icon {
          font-size: 36px;
          font-weight: 600;
          color: #222222;
          margin-right: 10px;
          font-family: Source Han Serif CN-SemiBold;
          line-height: 32px;
        }

        .tip {
          font-size: 14px;
          font-weight: 500;
          color: #B1771A;
          margin-left: 10px;
        }
      }

      .mainInfo {
        margin: 30px 0;
        border-radius: 10px;
        background-color: #FFFFFF;

        .infoItem {

          display: flex;
          align-items: center;

          .infoLable {
            font-size: 14px;
            color: #666;
          }

          .name {
            flex: 1;
          }

          .iconImg {
            width: 21px;
            height: 21px;
            margin-right: 13px;
          }

          .name {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: #222222;
            font-size: 14px;
            margin-right: 12px;
            font-weight: 500;
          }
        }
      }

      .btn {
        margin-top: 80px;
        margin-bottom: 12px;
      }
    }


  }

  // ::v-deep .uni-input-input{
  //   font-size: 36px;
  //   font-weight: 500;
  // }


}
</style>
