<template>
  <div class="myDiv">
    <div id="scatter"></div>
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
          text: 'scatter散点图/effectScatter带有涟漪效果的散点图'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {},
        yAxis: {},
        series: [
          {
            type: 'scatter',
            data: [
              [2, 3],
              [3, 6],
              [12, 21],
              [23, 45],
              [12, 11],
              [32, 54]
            ]
          },
          {
            type: 'effectScatter',
            showEffectOn: 'emphasis',
            data: [
              [12, 3],
              [3, 16],
              [12, 1],
              [33, 42],
              [22, 19],
              [38, 14]
            ]
          }
        ]
      }
    }
  },
  created: function () {

  },
  destroyed: function () {
    this.$echarts.dispose(document.getElementById('scatter'))
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init: function () {
      let myCharts = this.$echarts.init(document.getElementById('scatter'))
      myCharts.setOption(this.option, true)
    }
  }
}
</script>
<style scoped>
  #scatter {
    width: 800px;
    height: 400px;
    border: 1px solid red;
  }

</style>
