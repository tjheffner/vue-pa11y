<template>
  <div>
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>At a glance</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Links checked</td>
          <td>{{ data.total }}</td>
        </tr>
        <tr>
          <td>Links passed</td>
          <td>{{ data.passes }}</td>
        </tr>
        <tr>
          <td>Issues found</td>
          <td :class="{ red: data.errors > 5 }">{{ data.errors }}</td>
        </tr>
        <tr>
          <td>Unique issues</td>
          <td :class="{ red: uniques > 8 }">{{ uniques }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Link Breakdown</h2>
    <div v-for="(result, index) in data.results">
      <h4> {{ index }} - <span :class="{ red: result.length > 5 }">{{ result.length }} issues</span></h4>
      <table is="result" :result="result, index"></table>
    </div>

    <h2>Unique Errors</h2>
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>Error Name</th>
          <th>Docs</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in errorList">
          <td>{{ key }}</td>
          <td><a target="_blank" :href="'https://www.w3.org/TR/WCAG20-TECHS/' + getURICode(key)"></a></td>
          <td :class="{ red: value > 5 }">{{ value }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import _ from 'lodash'
import result from './result'

export default {
  name: 'report',
  components: { result },
  data () {
    return {
      errorList: [],
      uniques: 0
    }
  },
  methods: {
    ...mapActions([
      'pa11yData',
      'processResults',
    ]),
    getURICode: function (string) {
      // @todo fix this for multi-rule codes, i.e. H53,ARIA6
      const re = /Principle.*([A-Z]+[0-9]+(,[A-Z]+[0-9]+)*)/g;
      const code = re.exec(string);
      return code[1];
    },
  },
  computed: {
    ...mapState([
      'data',
      'results',
    ]),
    ...mapGetters([
      'getListOfErrors'
    ])
  },
  created() {
    this.$store.dispatch('pa11yData');
    this.$store.dispatch('processResults');
    this.errorList = this.$store.getters.getListOfErrors;
    this.uniques = _.size(this.errorList);
  }
}
</script>

<style>
  thead {
    background-color: #0e2e41;
    color: #fff
  }
  th {
    font-weight: 400
  }
  .table-hover tbody tr:hover td{
    background-color: #e2e2e2
  }
  a {
    color: #008eb0
  }
  a:hover {
    color: #0e2e41;
    text-decoration:none
  }
  /* adds external link icon */
  a[target='_blank']::after {
    content: '\29C9';
  }
  .red {
    color: red;
  }
</style>
