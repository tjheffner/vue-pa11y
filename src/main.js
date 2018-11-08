// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store';

Vue.config.productionTip = false;

// global filter for getting WCAG error codes.
Vue.filter('getURICode', function (string) {
  if (!string) return '';
  string = string.toString();

  // @TODO: handle multi-code matches i.e. H53,ARIA6
  const re = /Principle.*([A-Z]+[0-9]+(,[A-Z]+[0-9]+)*)/g;
  const code = re.exec(string);
  return code[1];
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
