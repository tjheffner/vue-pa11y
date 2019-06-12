<template>
  <div class="block">

    <p class="mb-0">Unique Errors</p>
    <ul class="mb-0 pl-0">
      <li class="filter" v-for="(error, index) in errorList" :key="index">
        <input type="checkbox" v-model="error.show">
        <a>{{ error.name }}</a>
        <span> [{{ error.count }}]</span>
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
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'filters',
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'data',
        'results',
        'errorList',
        'siteList',
      ]),
      ...mapGetters([
        'getListOfErrors',
        'uniqueErrors',
      ])
    },
  }
</script>