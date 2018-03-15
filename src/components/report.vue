<template>
  <div class="report">
    <h1>{{ title }}</h1>
    <div class="stats section">
      <p>urls checked: {{ data.total }}</p>
      <p>urls passed: {{ data.passes }}</p>
      <p>errors found: {{ data.errors }}</p>
      <p>unique errors: {{ uniques }}</p>
    </div>

    <div class="section">
      <h2>URL Report</h2>
      <ul v-for="(result, index) in data.results">
        <li is="result" :result="result, index"></li>
      </ul>
    </div>

    <div class="section">
      <h2>Unique Errors</h2>
      <p class="rule" v-for="(value, key) in errorList">{{ key }} <a target="_blank" :href="'https://www.w3.org/TR/WCAG20-TECHS/' + getURICode(key)"></a>: <span :class="{ red: value > 5 }">{{ value }}</span></p>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .stats {
    display: flex;
    justify-content: space-around;
  }

  .section {
    margin: 50px 0;
  }

  .rule {
    font-size: 16px;
  }

  .rule > span {
    font-weight: 700;
  }

  .red {
    color: red;
  }

</style>
