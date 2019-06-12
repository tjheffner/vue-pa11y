<template>
  <div class="block row result-container">

    <div class="block col-5" v-for="(site, index) in siteList" v-if="site.show" :key="index">
      <p>{{ site.name }}</p>
      <div class="row">
        <p class="block">{{ site.notices }}</p>
        <p class="block">{{ site.warnings }}</p>
        <p class="block">{{ site.errors }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'results',
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'data',
        'results',
      ]),
      ...mapGetters([
        'siteList',
      ]),
    }
  }
</script>