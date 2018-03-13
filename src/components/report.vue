<template>
  <div class="report">
    <h1>{{ title }}</h1>
    <div class="stats section">
      <p>urls checked: {{ data.total }}</p>
      <p>urls passed: {{ data.passes }}</p>
      <p>errors found: {{ data.errors }}</p>
    </div>

    <div class="section">
      <h2>URL Breakdown</h2>
      <ul v-for="(result, index) in data.results">
        <li is="result" :result="result, index"></li>
      </ul>
    </div>

    <!--<div v-if="result.length > 0" v-for="result in results">-->
      <!--<p v-for="item in result">{{ item.code }}</p>-->
    <!--</div>-->
    <div>
      <h2>Rule Breakdown</h2>
      <p v-for="(value, key) in errorList">{{ key }}: {{ value }}</p>
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
    ordered: function(items) {
      return items.sort();
    }
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
