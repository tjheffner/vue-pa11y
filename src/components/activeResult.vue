<template>
  <div class="block">
    <div class="result-header">
      <h3><a :href="result.name" target="_blank">{{ result.name }}</a></h3>
    </div>
    <table
      v-if="getActiveResults"
      class="table table-striped table-hover table-bordered"
    >
      <thead>
      <tr>
        <th>Type</th>
        <th>Issue</th>
        <th>Message</th>
        <th>Context</th>
        <th>Selector</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="item in getActiveResults">
          <td>{{ item.type }}</td>
          <td>
            <a target="_blank" :href="'https://www.w3.org/TR/WCAG20-TECHS/' + getURICode(item.code)">{{ getURICode(item.code) }}</a>
          </td>
          <td>{{ item.message }}</td>
          <td>{{ item.context }}</td>
          <td>{{ item.selector }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No errors reported here. Nice!</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'activeResult',
  props: ['result'],
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'getActiveResults',
    ]),
  },
  methods: {
    getURICode(string) {
      if (!string) return '';
      string = string.toString();

      // @TODO: handle multi-code matches i.e. H53,ARIA6
      const re = /Principle.*([A-Z]+[0-9]+(,[A-Z]+[0-9]+)*)/g;
      const code = re.exec(string);
      return code[1];
    },
  },
}
</script>