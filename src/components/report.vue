<template>
  <div class="report">
    <h1>{{ title }}</h1>
    <div class="stats section">
      <p>urls checked: {{ data.total }}</p>
      <p>urls passed: {{ data.passes }}</p>
      <p>errors found: {{ data.errors }}</p>
    </div>

    <div class="section">
      <h2>URL Report</h2>
      <ul v-for="(result, index) in data.results">
        <li is="result" :result="result, index"></li>
      </ul>
    </div>

    <div>
      <h2>Unique Errors</h2>
      <p v-for="(value, key) in errorList">{{ key }} <a target="_blank" :href="'https://www.w3.org/TR/WCAG20-TECHS/' + getURICode(key)"></a>: {{ value }}</p>
    </div>

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
      title: 'pa11y feedback',
      errorList: []
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .stats {
    display: flex;
    justify-content: space-around;
  }

  .section {
    margin: 50px 0;
  }
</style>
