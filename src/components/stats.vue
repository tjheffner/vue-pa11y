<template>
  <div class="section">
    <h2 class="section-header">Breakdown</h2>
    <div class="section-contents">

      <div class="stats">
        <ul>
          <li>Links checked: {{ data.total }}</li>
          <li>Links passed: {{ data.passes }}</li>
          <li>Success Rate: {{ Math.round((data.passes / data.total) * 100) }}%</li>
          <li>Issues found: <span :class="{ red: data.errors > 5 }">{{ data.errors }}</span></li>
          <li>Unique Errors: {{ uniqueErrors }}</li>
        </ul>
      </div>

      <div class="chart">
        <bar-chart
          :data="[['Passes', data.passes], ['Failures', data.total - data.passes]]"
          :colors="[['limegreen', 'red']]"
        ></bar-chart>
      </div>

      <div class="chart">
        <p style="text-align: center;">Mouseover pieces to see a site's share of total errors.</p>
        <pie-chart
          :data="siteCount"
          :legend="false"
        ></pie-chart>
      </div>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueChartkick from 'vue-chartkick';
  import Chart from 'chart.js';
  import _ from 'lodash'
  import { mapState, mapGetters } from 'vuex'

  Vue.use(VueChartkick, {adapter: Chart});

  export default {
    name: 'stats',
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'data',
        'results',
      ]),
      ...mapGetters([
        'uniqueErrors',
        'siteCount'
      ])
    },
  }
</script>