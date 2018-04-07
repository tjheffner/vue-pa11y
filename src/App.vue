<template>
  <div id="app" class="container">
    <header class="jumbotron">
      <h1 class="display-3">pa11y report</h1>
    </header>

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

<style lang="scss">
  @import './styles.scss';
</style>