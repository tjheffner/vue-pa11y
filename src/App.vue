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

        <activeResult v-if="activeResult" :result="activeResult"/>
      </div>
    </div>
</div>
</template>

<script>
import navbar from './components/navbar';
import stats from './components/stats';
import filters from './components/filters';
import results from './components/results';
import activeResult from './components/activeResult';

import { mapState, mapActions } from 'vuex'

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
    activeResult,
  },
  created () {
    this.loadReportData();
  },
  computed: {
    ...mapState([
      'activeResult',
    ]),
  },
  methods: {
    ...mapActions([
      'reportData',
      'results',
      'issues',
    ]),
    loadReportData () {
      this.$store.dispatch('reportData');
      this.$store.dispatch('results');
      this.$store.dispatch('sites');
      this.$store.dispatch('issues');
    },
  }
}
</script>

<style lang="scss">
  @import './styles.scss';
</style>