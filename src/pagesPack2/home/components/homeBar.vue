<template>
  <view class="echart-container">
    <view>社会状态统计图</view>
    <l-echart ref="chart" class="card-content"></l-echart>
  </view>
</template>

<script>
import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue';
import Vue from 'vue'
import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
Vue.prototype.$echarts = echarts
export default {
  data() {
    return {
      colorList: ["#2E7CF0", "#FF9900", "#21DD00", "#FFA9A4", "#00CEC3"]
    };
  },
  components:{
    LEchart
  },
  props:{
    shztList:{
      type:Object,
      default:null
    }
  },
  mounted() {
    this.initEchart();
  },
  watch:{
    shztList(){
      this.initEchart()
    }
  },
  methods: {
    initEchart() {
      // 绘制图表
      let options = {
        tooltip: {
          trigger: "item",
          position: ["5%", "5%"],
        },
        color:['#2E7CF0'],
        xAxis: {
          data: ['未复吸','社区戒毒','社区康复','强制戒毒','服刑','失联'],
          axisTick:{
              show:false
          },
          axisLabel: {
            //x轴文字的配置
            show: true,
            interval: 0,//使x轴文字显示全
            fontSize: 10,
            margin:12  //x轴文字间距
          },
            axisLine: {
            lineStyle: {
              fontSize: 12 //设置坐标轴轴线的字体大小
            }
          }
        },
        yAxis: {
          axisLine:{
              show:true
          },
          splitLine:{
              show:false
          },
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 20,
          top: 20,
          containLabel: true,
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              borderColor : "'#2E7CF0",
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius:[15, 15, 0, 0]
              }
            },
            barWidth:7,
            data: [
              this.shztList.weiFuXi,
              this.shztList.jieDu,
              this.shztList.kangFu,
              this.shztList.qiangZhiJieDu,
              this.shztList.fuXing,
              this.shztList.shiLian
            ],
          },
        ],
      };
      this.$refs.chart.init(this.$echarts, (chart) => {
        chart.setOption(options);
        // this.getData();
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.echart-container {
  height: 350rpx;
}
.card-content {
  display: flex;
  height: calc(100% - 40rpx);
  .echart {
    // flex: 1;
    width: 70%;
    height: 100%;
  }
  .legend {
    flex: 1;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    .item-legend {
      display: flex;
      align-items: center;

      .dot {
        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        background: #2e7cf0;
        margin-right: 20rpx;
      }
      .content {
        flex: 1;
        font-size: 24rpx;
        color: #666666;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>