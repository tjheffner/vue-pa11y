<template>
  <div class="section">
    <h2 class="section-header">Detailed Breakdown</h2>
    <div class="section-contents">
      <div class="result-container">
        <result v-for="(link, index) in getLinks"
                  :result="link, index"
                  :visible="true"
                  :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import _ from 'lodash'
  import result from './result';

  export default {
    name: 'results',
    components: { result },
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'data',
        'results',
      ]),
      ...mapGetters([
        'getLinks',
      ]),
    }
  }
</script>