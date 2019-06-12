<template>
  <div class="block">
    <ul class="mb-0 pl-0">
      <li>Links checked: {{ data.total }}</li>
      <li>Links passed: {{ data.passes }}</li>
      <li>Success Rate: {{ Math.round((data.passes / data.total) * 100) }}%</li>
      <li>Issues found: <span :class="{ red: data.errors > 5 }">{{ data.errors }}</span></li>
      <li>Unique Issues: {{ uniqueIssues }}</li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

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
        'uniqueIssues',
        'siteCount'
      ])
    },
  }
</script>