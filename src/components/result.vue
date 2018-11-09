<template>
  <div class="result">
    <div class="result-header">
      <h3><a :href="result" target="_blank">{{ result }}</a></h3>
      <button v-on:click="toggle">{{ buttonText }}</button>
    </div>
    <div v-show="display" class="result-contents">
      <table
      v-if="getErrorsForLink(result).length > 0"
      class="table table-striped table-hover table-bordered"
      >
        <thead>
          <tr>
            <th>Error</th>
            <th>Message</th>
            <th>Context</th>
            <th>Selector</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in getErrorsForLink(result)"
              v-if="checkErrorVisibility(item.code)"
          >
            <td>
              <a target="_blank" :href="'https://www.w3.org/TR/WCAG20-TECHS/'
              + item.code | getURICode ">{{ item.code | getURICode }}</a>
            </td>
            <td>{{ item.message }}</td>
            <td>{{ item.context }}</td>
            <td>{{ item.selector }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No errors reported here. Nice!</p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'result',
    props: ['result', 'index', 'visible'],
    data () {
      return {
        display: this.visible,
        buttonText: 'Hide'
      }
    },
    computed: {
      ...mapState([
        'data',
        'results',
      ]),
      ...mapGetters([
        'uniqueErrors',
        'results',
        'getErrorsForLink',
        'siteCount'
      ])
    },
    methods: {
      // given an error code, check the unique errorList to see if
      // it should be included in the list of visible issues.
      checkErrorVisibility(code) {
        const unique = this.$store.getters.errorList.filter(error => error.name === code);

        return unique[0].show;
      },
      // toggles a site's results & button text.
      toggle() {
        this.display = !this.display;
        this.buttonText = this.display ? 'Hide' : 'Show';
      }
    }
  }
</script>