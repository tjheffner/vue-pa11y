<template>
  <div class="block result-container">
    <div class="row">
      <div class="block result"
           v-for="(site, index) in activeSiteList"
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
        'checkedSites',
      ]),
      ...mapGetters([
        'getSiteList',
      ]),
      activeSiteList() {
        return this.getSiteList.filter(site => {
          return this.checkedSites.some(check => {
            return site.name === check.name && check.show;
          })
        })
      }
    },
    methods: {
      ...mapActions([
        'setActiveResult'
      ]),
    }
  }
</script>