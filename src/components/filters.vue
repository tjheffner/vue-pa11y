<template>
  <div class="block">

    <p class="mb-0">Unique Errors</p>
    <ul class="mb-0 pl-0">
      <li class="filter" v-for="error in errorList">
        <input type="checkbox" v-model="error.show">
        <a target="_blank" :href="`https://www.w3.org/TR/WCAG20-TECHS/${findURICode(error.name)}`">{{ findURICode(error.name) }}</a>
        <span> [{{ error.count }}]</span>
      </li>
    </ul>

    <p class="mb-0">Sites</p>
    <ul class="mb-0 pl-0">
      <li class="filter" v-for="site in siteList">
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
    methods: {
      findURICode(string) {
        if (!string) return '';
        string = string.toString();
        // @TODO: handle multi-code matches i.e. H53,ARIA6
        const re = /Principle.*([A-Z]+[0-9]+(,[A-Z]+[0-9]+)*)/g;
        const code = re.exec(string);
        return code[1];
      }
    }
  }
</script>