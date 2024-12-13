<template>
  <view class="echart-container">
    <view>人员风险统计图</view>
    <view class="card-content">
      <view class="echart">
        <l-echart ref="chart"></l-echart>
      </view>
      <view class="legend">
        <view
          class="item-legend"
          v-for="(item, index) in dateList"
          :key="item.name + index"
        >
          <view class="dot" :style="'background:' + item.color"></view>
          <view class="content">
            <view class="name">{{ item.name }}</view>
            <view>{{ item.value }}</view>
          </view>
        </view>
      </view>
    </view>
    
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
          name: "高风险",
          value: '0次',
          color: "#2E7CF0",
        },
        {
          name: "中风险",
          value: '0次',
          color: "#FF9900",
        },
        {
          name: "低风险",
          value: '0次',
          color: "#21DD00",
        },
      ],
    };
  },
  components:{
    LEchart
  },
  props:{
    ryfxList:{
      type:Object,
      default:null
    }
  },
  mounted(){
    this.initEchart()
  },
  watch:{
    ryfxList(){
      this.initEchart()
    }
  },
  methods: {
    initEchart() {
      this.dateList[0].value = this.ryfxList.gfx + '个'
      this.dateList[1].value = this.ryfxList.zfx + '个'
      this.dateList[2].value = this.ryfxList.dfx + '个'
      // this.dateList[3].value = this.ryfxList.cgfx + '个'
      // 绘制图表
      let options = {
        tooltip: {
          trigger: "item",
          position: ["5%", "5%"],
        },
        color: this.colorList,
        grid: {
          left: 20,
          right: 20,
          bottom: 20,
          top: 20,
          containLabel: true,
        },
        series: [
          {
            type: "pie",
            // radius: ["60%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 1,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                name: "高风险",
                value: this.ryfxList.gfx || 0,
              },
              {
                name: "中风险",
                value: this.ryfxList.zfx || 0,
              },
              {
                name: "低风险",
                value: this.ryfxList.dfx || 0,
              },
            ],
          },
        ],
      };
      this.$refs.chart.init(echarts, (chart) => {
        chart.setOption(options);
        // this.getData();
      });
    },
    // upDataEchart() {
    //   let options = {
    //     series: [
    //       {
    //         data: this.dateList,
    //       },
    //     ],
    //   };
    //   this.$refs.chart.setOption(options);
    // },
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