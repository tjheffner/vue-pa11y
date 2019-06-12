<template>
  <div class="block row result-container">

    <div class="block col-5" v-for="(link, index) in getLinks">
      {{ link }}
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