<template>
  <div class="block">

    <p class="mb-0">Unique Issues</p>
    <ul class="mb-0 pl-0">
      <li class="filter">
        <input type="checkbox" v-model="showAll" @click="showIssues">
        Show all issues
        <span> [{{ data.errors }}]</span>
      </li>
      <li class="filter">
        <input type="checkbox" v-model="hideNotices" @click="hideIssues('notice')">
        Hide all notices
        <span> [{{ getStats.notice }}]</span>
      </li>
      <li class="filter">
        <input type="checkbox" v-model="hideWarnings" @click="hideIssues('warning')">
        Hide all warnings
        <span> [{{ getStats.warning }}]</span>
      </li>
      <li class="filter">
        <input type="checkbox" v-model="hideErrors" @click="hideIssues('error')">
        Hide all errors
        <span> [{{ getStats.error }}]</span>
      </li>
      <li class="filter" v-for="(issue, index) in issueList" :key="index">
        <input type="checkbox" v-model="issue.show">
        {{ issue.name }}
        <span> [{{ issue.count }}]</span>
      </li>
    </ul>

    <p class="mb-0">Sites</p>
    <ul class="mb-0 pl-0">
      <li class="filter" v-for="(site, index) in siteList" :key="index">
        <input type="checkbox" v-model="site.show">
        {{ site.name }}
      </li>
    </ul>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'filters',
    data () {
      return {
        showAll: true,
        hideNotices: false,
        hideWarnings: false,
        hideErrors: false,
      }
    },
    computed: {
      ...mapState([
        'data',
        'results',
        'issueList',
        'siteList',
      ]),
      ...mapGetters([
        'getStats'
      ]),
    },
    methods: {
      showIssues() {
        this.showAll = !this.showAll;

        if (this.showAll === true) {
          this.issueList.forEach(issue => {
            issue.show = true;
          });
          this.hideNotices = false;
          this.hideWarnings = false;
          this.hideErrors = false;
        }
      },
      hideIssues(type) {
        this.showAll = false;
        this.issueList.forEach(issue => {
          if (issue.type === type) {
            issue.show = false;
          }
        });
      },
    }
  }
</script>