<template>
  <div class="myDiv">
    <div id="yAxis"></div>
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
          text: 'y轴'
        },
        xAxis: {},
        yAxis: {
          name: 'y轴的name',
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          zlevel: 3
        },
        series: [
          {
            type: 'line',
            data: [10, 20, 30, 28, 19, 46, 34]
          },
          {
            type: 'line',
            data: [12, 22, 32, 18, 59, 36, 30]
          }
        ]
      }
    }
  },
  created: function () {

  },
  destroyed: function () {
    this.$echarts.dispose(document.getElementById('yAxis'))
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init () {
      let myCharts = this.$echarts.init(document.getElementById('yAxis'))
      myCharts.setOption(this.option, true)
    }
  }
}
</script>
<style scoped>
  #yAxis {
    width: 800px;
    height: 400px;
    border: 1px solid red;
  }
</style>
