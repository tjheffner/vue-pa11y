<template>
  <div id="app" class="container">

    <nav class="navbar navbar-light bg-light navbar-expand-lg fixed-top">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item"><a class="nav-link" href="http://pa11y.org/" target="_blank" title="Pa11y Homepage">What is Pa11y?</a></li>
          <li class="nav-item"><a class="nav-link" href="https://github.com/pa11y/pa11y#configuration" target="_blank"  title="Technical Documentation">Documentation</a></li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li role="separator" class="dropdown-divider"></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="supportDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              File an Issue
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="supportDropdown">
              <a class="dropdown-item" target="_blank" href="https://github.com/tjheffner/vue-pa11y/issues">Dashboard issues</a>
              <a class="dropdown-item" target="_blank" href="https://github.com/pa11y/pa11y/issues">pa11y issues</a>
              <a class="dropdown-item" target="_blank" href="https://github.com/pa11y/pa11y-ci">pa11y-ci issues</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <header class="jumbotron">
      <h1 class="display-3">pa11y results</h1>
    </header>

    <stats/>
    <errors/>
    <results/>

  </div>
</template>

<script>
import stats from './components/stats';
import errors from './components/errors';
import results from './components/results';
import { mapGetters, mapActions, mapState } from 'vuex'


export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    stats,
    errors,
    results,
  },
  created () {
    this.loadReportData();
    this.loadResultData();
    this.loadErrorData();
  },
  methods: {
    ...mapActions([
      'reportData',
      'results',
      'errors',
    ]),
    loadReportData () {
      this.$store.dispatch('reportData');
    },
    loadResultData () {
      this.$store.dispatch('results');
    },
    loadErrorData () {
      this.$store.dispatch('errors');
    }
  }
}
</script>

<style lang="scss">
  @import './styles.scss';
</style>