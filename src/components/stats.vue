<template>
  <div class="section">
    <h2 class="section-header">Breakdown</h2>

    <div class="section-contents">
      <div class="pie-chart">
        <pie-chart
          :data="[['Passes', data.passes], ['Failures', data.total - data.passes]]"
          :colors="['limegreen', 'red']"
        ></pie-chart>
      </div>

      <div class="stats">
        <ul>
          <li>Links checked: {{ data.total }}</li>
          <li>Links passed: {{ data.passes }}</li>
          <li>Success Rate: {{ Math.round((data.passes / data.total) * 100) }}%</li>
          <li>Issues found: <span :class="{ red: data.errors > 5 }">{{ data.errors }}</span></li>
          <li>Unique Errors: {{ uniques }}</li>
        </ul>
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
      return {
        uniques: 0,
      }
    },
    computed: {
      ...mapState([
        'data',
        'results',
      ]),
    },
    created () {
      this.uniques = _.size(this.$store.getters.getListOfErrors);
    }

  }
</script>