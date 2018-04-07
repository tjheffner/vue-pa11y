<template>
  <table v-if="result.length > 0" class="table table-striped table-hover table-bordered">
    <thead>
      <tr>
        <th>Error</th>
        <th>Message</th>
        <th>Context</th>
        <th>Selector</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in result">
        <td><a target="_blank" :href="'https://www.w3.org/TR/WCAG20-TECHS/' + getURICode(item.code)">{{ getURICode(item.code) }} </a></td>
        <td>{{ item.message }}</td>
        <td>{{ item.context }}</td>
        <td>{{ item.selector }}</td>
      </tr>
    </tbody>
  </table>
  <table v-else>
  </table>
</template>

<script>
  export default {
    name: 'result',
    props: ['result', 'index'],
    data () {
      return {}
    },
    methods: {
      getURICode: function (string) {
        // @todo fix multi rule, pass this in from somewhere (store maybe?) to be DRY
        const re = /Principle.*([A-Z]+[0-9]+(,[A-Z]+[0-9]+)*)/g;
        const code = re.exec(string);
        return code[1];
      }
    },
  }
</script>
