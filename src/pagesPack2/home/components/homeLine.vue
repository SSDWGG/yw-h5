<template>
  <view class="echart-container">
    <view>吸毒人员趋势图</view>
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
      colorList: ["#2E7CF0", "#FF9900", "#21DD00", "#FFA9A4", "#00CEC3"],
      dateList: [
        {
          name: "高度",
          value: "20次",
          color: "#2E7CF0",
        },
        {
          name: "中度",
          value: "20次",
          color: "#FF9900",
        },
      ],
    };
  },
  components:{
    LEchart
  },
  props:{
    xdryqst:{
      type:Array,
      default:null
    }
  },
  mounted() {
    this.initEchart();
  },
  watch:{
    xdryqst(){
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
        color:['#FFA9A4'],
        xAxis: {
          data: this.xdryqst.map(e => {return e.key}),
          axisTick:{
              show:false
          },
          axisLabel: {
            //x轴文字的配置
            rotate:'-30',
            show: true,
            interval: 0,//使x轴文字显示全
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
            data: this.xdryqst.map(e => {return e.value}),
          },
        ],
      };
      this.$refs.chart.init(echarts, (chart) => {
        chart.setOption(options);
        // this.getData();
      });
    },
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