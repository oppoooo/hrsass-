<template>
  <div class="radarCharts" ref="main" id="main">雷达图</div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRadar()
  },
  methods: {
    initRadar() {
      var myChart = echarts.init(this.$refs.main)
      // 绘制图表
      const radarOption = {
        backgroundColor: 'purple',
        title: {
          text: '人员绩效表',
          textStyle: {
            color: 'green'
          }
        },
        legend: {
          data: ['张三', '李四'],
          textStyle: {
            color: '#fff',
            fontSize: 15
          }
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 100 },
            { name: 'Administration', max: 100 },
            { name: 'Information Technology', max: 100 },
            { name: 'Customer Support', max: 100 },
            { name: 'Development', max: 100 },
            { name: 'Marketing', max: 100 }
          ],
          splitLine: {
            lineStyle: {
              color: ['red', 'blue']
            }
          },
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'yellow'
            }
          }
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [30, 20, 60, 80, 10, 50],
                name: '张三'
              },
              {
                value: [60, 80, 90, 30, 20, 35],
                name: '李四'
              }
            ]
          }
        ]
      }
      myChart.setOption(radarOption)
    }
  }
}
</script>

<style scoped lang="scss">
.radarCharts {
  width: 700px;
  height: 500px;
}
</style>
