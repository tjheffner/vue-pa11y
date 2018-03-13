<template>
  <div id="app">
    <report/>
  </div>
</template>

<script>
import report from './components/report'

export default {
  name: 'App',
  components: {
    report,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
