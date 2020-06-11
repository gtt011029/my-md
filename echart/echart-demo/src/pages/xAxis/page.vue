<template>
  <div class="myDiv">
    <div id="xAxis"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      option: {
        title: {
          text: 'x轴'
        },
        xAxis: {
          position: 'bottom',
          name: 'x轴的名字',
          nameTextStyle: {
            color: 'red',
            fontStyle: 'oblique',
            fontSize: 14
          },
          inverse: false,
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [20, 19, 49, 10, 13, 34]
          }
        ]

      }
    }
  },
  created: function () {

  },
  destroyed: function () {
    this.$echarts.dispose(document.getElementById('xAxis'))
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init: function () {
      let myCharts = this.$echarts.init(document.getElementById('xAxis'))
      myCharts.setOption(this.option, true)
    }
  }
}
</script>
<style scoped>
#xAxis {
  width: 800px;
  height: 400px;
  border: 1px solid red;
}
</style>
