<template>
  <div class="myDiv">
    <div id="line"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      option: {
        title: {
          text: 'line'
        },
        legend: {
          data: ['line-1', 'line-2', 'line-3']
        },
        tooltip: {
          trigger: 'axis'
          // formatter: function (params) {
          //   return params.seriesName + ' [' + params.value + ']'
          // }
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {
              show: true,
              type: ['line', 'bar', 'stack', 'tiled']
              // type: ['stack', 'tiled']
            },
            saveAsImage: {
              show: true
            },
            dataView: {
              tite: '数据视图'
            },
            dataZoom: {
              title: '数据区域缩放'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          boundaryGap: false
        },
        yAxis: {},
        series: [
          {
            type: 'line',
            data: [10, 23, 45, 52, 2, 45, 65],
            name: 'line-1',
            symbol: 'rect',
            smooth: true
          },
          {
            type: 'line',
            data: [13, 27, 35, 12, 62, 15, 5],
            name: 'line-2',
            smooth: true
          },
          {
            type: 'line',
            data: [15, 53, 98, 22, 82, 25, 15],
            name: 'line-3',
            smooth: true
          }
        ]
      }
    }
  },
  created: function () {

  },
  destroyed: function () {
    this.$echarts.dispose(document.getElementById('line'))
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init: function () {
      let myEcharts = this.$echarts.init(document.getElementById('line'))
      myEcharts.setOption(this.option, true)
    }
  }
}
</script>
<style scoped>
  #line {
    width: 1000px;
    height: 600px;
    border: 1px solid red;
  }
</style>
