<template>
  <nav class="navbar navbar-light bg-light navbar-expand-lg fixed-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav mr-auto">
        <li id="logo" class="nav-item nav-link">pa11y results</li>
        <li class="nav-item"><a class="nav-link" href="http://pa11y.org/" target="_blank" title="Pa11y Homepage">What is Pa11y?</a></li>
        <li class="nav-item"><a class="nav-link" href="https://github.com/pa11y/pa11y#configuration" target="_blank"  title="Technical Documentation">Documentation</a></li>
      </ul>
      <ul class="navbar-nav mx-auto">
        <li class="nav-item"><a href="#breakdown" class="nav-link">At a Glance</a></li>
        <li class="nav-item"><a href="#errorlist" class="nav-link">Errors</a></li>
        <li class="nav-item"><a href="#results" class="nav-link">Results</a></li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li role="separator" class="dropdown-divider"></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="supportDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            File an Issue
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="supportDropdown">
            <a class="dropdown-item" target="_blank" href="https://github.com/tjheffner/vue-pa11y/issues">Dashboard issues</a>
            <a class="dropdown-item" target="_blank" href="https://github.com/pa11y/pa11y/issues">pa11y issues</a>
            <a class="dropdown-item" target="_blank" href="https://github.com/pa11y/pa11y-ci">pa11y-ci issues</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {}
    },
  }
</script>