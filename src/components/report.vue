<template>
  <div>
    <h2>Report Stats</h2>
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <td>Links checked</td>
          <td>Links passed</td>
          <td>Success Rate</td>
          <td>Issues found</td>
          <td>Unique issues</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ data.total }}</td>
          <td>{{ data.passes }}</td>
          <td>{{ (data.passes / data.total) * 100 }}%</td>
          <td :class="{ red: data.errors > 5 }">{{ data.errors }}</td>
          <td :class="{ red: uniques > 8 }">{{ uniques }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Error List</h2>
    <table class="table table-striped table-hover table-bordered">
      <thead>
      <tr>
        <th>Show</th>
        <th>Error Code</th>
        <th>Error Name</th>
        <th>Count</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, key) in errorList">
        <td><input type="checkbox" checked></td>
        <td><a target="_blank" :href="'https://www.w3.org/TR/WCAG20-TECHS/' + getURICode(key)">{{ getURICode(key) }}</a></td>
        <td>{{ key }} </td>
        <td :class="{ red: value > 5 }">{{ value }}</td>
      </tr>
      </tbody>
    </table>

    <h2>Link Breakdown</h2>
    <div v-for="(result, index) in data.results" class="result-container">
      <h3 @click="$set(result, 'selected', !result.selected)"
          :class="{ activeTable: result.selected }">
        <i class="fa" v-if="result.length > 0" aria-hidden="true" :class="{ 'fa-minus': result.selected, 'fa-plus': !result.selected }"></i>
        {{ index }} - <span :class="{ red: result.length > 5, green: result.length == 0 }">{{ result.length }} issues </span>
      </h3>
      <result :result="result, index"/>
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
    ]),
    iconClass: function () {
      return {
        'fa-minus': !result.selected,
        'fa-plus': result.selected
      }
    }
  },
  created() {
    this.$store.dispatch('pa11yData');
    this.$store.dispatch('processResults');
    this.errorList = this.$store.getters.getListOfErrors;
    this.uniques = _.size(this.errorList);
  }
}
</script>
