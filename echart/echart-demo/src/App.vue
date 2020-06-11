<template>
  <div id="app">
    <div class='routerLink'>
      <router-link v-for="(item, index) in pathList" :key="index" :to='{ path: item.path }'>{{ item.name }}</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      pathList: [
        {
          name: 'demo1',
          path: '/demo1'
        },
        {
          name: 'grid',
          path: '/grid'
        },
        {
          name: 'xaxis',
          path: '/xaxis'
        },
        {
          name: 'yaxis',
          path: '/yaxis'
        },
        {
          name: 'polar',
          path: '/polar'
        },
        {
          name: 'line',
          path: '/line'
        },
        {
          name: 'pie',
          path: '/pie'
        },
        {
          name: 'scatter',
          path: '/scatter'
        },
        {
          name: 'radar',
          path: '/radar'
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.routerLink {
  width: 100%;
  height: 40px;
  /* border: 1px solid red; */
  line-height: 40px;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
}
.routerLink > a {
  text-decoration: none;
  margin: 0 20px;
}
</style>
