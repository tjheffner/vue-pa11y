<template>
  <div class="section">
    <h2 class="section-header">Reported Issues</h2>

    <div class="section-contents">
      a whole bunch of stuff is gonna go in here
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'errors',
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'data',
        'errors'
      ]),
    },
  }
</script>