<template>
  <li v-if="result.length > 0" :class="{ active: showResults }">
    <p v-on:click="toggleResults" class="bold">{{ index }} <a target="_blank" :href="index"></a> : <span class="error">{{ result.length }} issues</span></p>
    <div v-for="item in result" :class="item.type" class="result-container">
      <p>{{ item.code }} <a target="_blank" :href="'https://www.w3.org/TR/WCAG20-TECHS/' + getURICode(item.code)">[DOCS]</a></p>
      <p>{{ item.message }}</p>
      <p>{{ item.selector }}</p>
    </div>
  </li>
  <li v-else>
    <p class="bold">{{ index }}:<span class="success">No errors here! </span></p>
  </li>
</template>

<script>
  export default {
    name: 'result',
    props: ['result', 'index'],
    data () {
      return {
        showResults: false
      }
    },
    methods: {
      toggleResults: function () {
        this.showResults = !this.showResults;
      },
      getURICode: function (string) {
        // @todo fix multi rule, pass this in from somewhere (store maybe?) to be DRY
        const re = /Principle.*([A-Z]+[0-9]+(,[A-Z]+[0-9]+)*)/g;
        const code = re.exec(string);
        return code[1];
      }
    },
  }
</script>

<style>
  li > div {
    padding: 10px;
    margin: 5px;
    display: none;
  }

  li.active > div {
    display: block;
  }

  .bold {
    font-weight: bold;
  }

  .bold > span {
    font-weight: normal;
  }

  .result-container {
    margin: 10px
  }

  .result-container > * {
    padding: 0 15px;
  }

  /* adds external link icon */
  a[target='_blank']::after {
    content: '\29C9';
  }

  .error {
    background-color: palevioletred;
    padding: 5px;
  }
  .warning {
    background-color: palegoldenrod;
  }
  .success {
    background-color: lightgreen;
    padding: 5px;
  }
</style>