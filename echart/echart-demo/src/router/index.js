import Vue from 'vue'
import Router from 'vue-router'

import Demo1 from '@/pages/echartsDemo-1/page'
import Grid from '@/pages/grid/page'
import xAxis from '@/pages/xAxis/page'
import yAxis from '@/pages/yAxis/page'
import Polar from '@/pages/polar/page'
import Line from '@/pages/line/page'
import Pie from '@/pages/pie/page'
import Scatter from '@/pages/scatter/page'
import Radar from '@/pages/radar/page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo1',
      component: Demo1
    },
    {
      path: '/demo1',
      name: 'Demo1',
      component: Demo1
    },
    {
      path: '/grid',
      name: 'Grid',
      component: Grid
    },
    {
      path: '/xaxis',
      name: 'xAxis',
      component: xAxis
    },
    {
      path: '/yaxis',
      name: 'yAxis',
      component: yAxis
    },
    {
      path: '/polar',
      name: 'Polar',
      component: Polar
    },
    {
      path: '/line',
      name: 'Line',
      component: Line
    },
    {
      path: '/pie',
      name: 'Pie',
      component: Pie
    },
    {
      path: '/scatter',
      name: 'Scatter',
      component: Scatter
    },
    {
      path: '/radar',
      name: 'Radar',
      component: Radar
    }
  ]
})
