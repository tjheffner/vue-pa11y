<template>
  <div class="section">
    <h2 id="errorlist" class="section-header">Reported Issues</h2>

    <div class="section-contents">
      <table class="table table-striped table-hover table-bordered">
        <thead>
        <tr>
          <th>Show</th>
          <th>Error Code</th>
          <th>Error Name</th>
          <th>Count</th>
          <th>Reported On</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="error in errorList">
          <td><input type="checkbox" v-model="error.show"></td>
          <td>
            <a target="_blank" :href="`https://www.w3.org/TR/WCAG20-TECHS/${findURICode(error.name)}`">{{ findURICode(error.name) }}</a>
            </td>
          <td>{{ error.name }} </td>
          <td :class="{ red: error.count > 5 }">{{ error.count }}</td>
          <td v-html="displaySites(error.site)"></td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'errors',
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'data',
        'results',
        'errorList'
      ]),
      ...mapGetters([
        'getListOfErrors',
        'uniqueErrors',
      ])
    },
    methods: {
      displaySites(sites) {
        return sites.map(this.linebreak).join('');
      },
      linebreak (val) {
        return `<p><a href="${val}" target="_blank">${val}</a></p>`
      },
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