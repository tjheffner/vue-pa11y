<template>
  <div class="block result-container">
    <div class="row">
      <div class="block result"
           v-for="(site, index) in siteList"
           v-if="site.show"
           :key="index"
           @click="setActiveResult(site)"
      >
        <p>{{ site.name }}</p>
        <div class="row">
          <p class="block blue">{{ site.notices }} notices</p>
          <p class="block yellow">{{ site.warnings }} warnings</p>
          <p class="block red">{{ site.errors }} errors</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'

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
    },
    methods: {
      ...mapActions([
        'setActiveResult'
      ]),
    }
  }
</script>