<template>
  <div class="block result-container">
    <div class="row">
      <div class="block result"
           v-for="(site, index) in getSiteList"
           v-if="site.show"
           :key="index"
           @click="setActiveResult(site)"
      >
        <p>{{ site.name }}</p>
        <div class="row">
          <p class="block">{{ site.notice }} notices</p>
          <p class="block">{{ site.warning }} warnings</p>
          <p class="block">{{ site.error }} errors</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

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
        'getSiteList',
      ])
    },
    methods: {
      ...mapActions([
        'setActiveResult'
      ]),
    }
  }
</script>