<template>
  <div class="block">

    <p class="mb-0">Unique Issues</p>
    <ul class="mb-0 pl-0">
      <li class="filter" v-for="(issue, index) in issueList" :key="index">
        <input type="checkbox" v-model="issue.show">
        <a>{{ issue.name }}</a>
        <span> [{{ issue.count }}]</span>
      </li>
    </ul>

    <p class="mb-0">Sites</p>
    <ul class="mb-0 pl-0">
      <li class="filter" v-for="(site, index) in siteList" :key="index">
        <input type="checkbox" v-model="site.show">
        <a target="_blank" :href="site.name">{{ site.name }}</a>
      </li>
    </ul>

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'filters',
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'data',
        'results',
        'issueList',
        'siteList',
      ]),
    },
  }
</script>