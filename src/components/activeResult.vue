<template>
  <div class="block">
    <div class="result-header">
      <h3><a :href="result.name" target="_blank">{{ result.name }}</a></h3>
    </div>
    <table
      v-if="result.issues"
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
      <tr>
      </tr>
      </tbody>
    </table>
    <p v-else>No errors reported here. Nice!</p>
  </div>
</template>

<script>
  export default {
    name: 'activeResult',
    props: ['result'],
    data () {
      return {}
    },
  }
</script>