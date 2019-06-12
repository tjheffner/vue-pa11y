<template>
  <div id="app" class="container">
    <navbar />

    <div class="row pt-2 mt-5">
      <div class="sidebar col-3 p-3">
        <stats />

        <filters />
      </div>
      <div class="main col-9 p-3">
        <results/>

        <div>detailed breakdown per site if one is selected</div>
      </div>
    </div>
</div>
</template>

<script>
import navbar from './components/navbar';
import stats from './components/stats';
import filters from './components/filters';

import results from './components/results';
import { mapGetters, mapActions, mapState } from 'vuex'


export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    navbar,
    stats,
    filters,
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
      this.$store.dispatch('sites');
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