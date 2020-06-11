<template>
  <div class="myDiv">
    <div id="pie"></div>
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
          text: 'pie饼图',
          subtext: '这边可以有副标题吗'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            legendHoverLink: false,
            hoverAnimation: false,
            hoverOffset: 0,
            selectedMode: true,
            selectedOffset: 0,
            // roseType: true,
            label: {
              show: true,
              position: 'outside',
              formatter: function (param) {
                return param.data.name + ' (' + param.data.value + ')'
              }
            },
            labelLine: {
              show: true,
              length: 29,
              length2: 29,
              smooth: true
            },
            data: [
              {
                value: 111,
                name: '直接访问',
                label: {
                  show: true,
                  position: 'outside'
                },
                tooltip: {
                  trigger: 'axis'
                }
              },
              {value: 231, name: '邮件营销'},
              {value: 451, name: '搜索引擎'}
            ]
          }
        ]
      }
    }
  },
  created: function () {

  },
  destroyed: function () {
    this.$echarts.dispose(document.getElementById('pie'))
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init: function () {
      let myCharts = this.$echarts.init(document.getElementById('pie'))
      myCharts.setOption(this.option, true)
    }
  }
}
</script>
<style scoped>
 #pie {
   width: 800px;
   height: 500px;
   border: 1px solid red;
 }
</style>
