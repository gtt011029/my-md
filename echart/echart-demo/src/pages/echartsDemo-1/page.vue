<template>
  <div>
      <div id="demo"></div>
      <div style="width: 100px; height: 100px; border: 1px solid red;" v-show="false">
        <h1>hahahhaha</h1>
      </div>
      <div style="width: 100px; height: 100px; border: 1px solid blue;">
        <h1>ehehheheheheh</h1>
      </div>
  </div>
</template>

<script>
export default {
  name: 'demo1',
  data () {
    return {
      option: {
        title: {
          text: 'ECharts 入门示例',
          show: true,
          subtext: '这个地方是副标题'
        },
        tooltip: {},
        legend: {
          data: ['销量', '生产量'],
          itemGap: 10,
          formatter: function (name) {
            return 'Legend' + name
          },
          selected: {
            '生产量': false
          },
          selectedMode: 'single'
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            // data: {[5, 20, 36, 10, 10, 20], [5, 120, 36, 10, 10, 20]}
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name: '生产量',
            type: 'bar',
            data: [10, 25, 40, 13, 14, 23]
          }
        ]
      },
      data: ''
    }
  },
  created: function () {
  },
  destroyed: function () {
    this.$echarts.dispose(document.getElementById('demo'))
  },
  mounted: function () {
    this.drawLine()
  },
  methods: {
    drawLine: function () {
      console.error(document.getElementById('demo'))
      debugger
      let myChart = this.$echarts.init(document.getElementById('demo'))
      myChart.setOption(this.option, true)
    }
  },
  watch: {
  }
}
</script>

<style scoped>
    #demo {
        height: 400px;
        width: 800px;
        border: 1px solid red;
    }
</style>
