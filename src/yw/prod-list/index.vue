<template>
  <view class="container">
    <u-swiper :list="bannerlist" indicator height='220px'></u-swiper>

   
  </view>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue";
import Card from "@/components/Card.vue";
export default {
  components: {
    Card,
    Tabbar
  },
  data() {
    return {
      rkList: [
        {
          title: '零售专区',
          bg: require("@/static/yw/rkbg.png")
        }, {
          title: '复购专区',
          bg: require("@/static/yw/rkbg.png")
        }, {
          title: '配件专区',
          bg: require("@/static/yw/rkbg.png")
        }
      ],
      bannerlist: [require("@/static/yw/swiper/hb1.png"), require("@/static/yw/swiper/hb1.png")],
    };
  },

  methods: {


  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 15px 16px;
  background: #fff;

  .rkList {
    display: flex;

    .rkItem {
      flex: 1;
      color: #FFF8E9;
      font-weight: Medium;
      font-size: 14px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 36px;

      .txt {
        width: 30px;
        z-index: 999;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }

      .bg {
        width: 90px;
        height: 90px;
      }
    }
  }

  .hy {
    display: flex;
    background-color: #FFF7E8;
    border-radius: 10px;
    padding: 11px 12px;
    align-items: center;

    .hyicon {
      width: 27px;
      height: 24px;
      margin-right: 14px;
    }

    .txt {
      font-family: Source Han Serif CN-Sem;
      font-size: 18px;
      font-weight: 700;
      color: #BD7527;
    }

    .go {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
