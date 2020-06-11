<template>
  <div>
      <div id="grid"></div>
  </div>
</template>

<script>
export default {
  name: 'demo1',
  data () {
    return {
      option: {
        title: {
          text: '网格'
        },
        tooltip: {},
        legend: {},
        grid: {
          show: true,
          containLabel: true,
          backgroundColor: 'red',
          tooltip: '坐标系特定的tooltip设定'
        },
        xAxis: {},
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      data: ''
    }
  },
  created: function () {
  },
  destroyed: function () {
    this.$echarts.dispose(document.getElementById('grid'))
  },
  mounted: function () {
    this.drawLine()
  },
  methods: {
    drawLine: function () {
      let myChart = this.$echarts.init(document.getElementById('grid'))
      myChart.setOption(this.option, true)
    }
  },
  watch: {
  }
}
</script>

<style scoped>
    #grid {
        height: 400px;
        width: 800px;
        border: 1px solid red;
    }
</style>
