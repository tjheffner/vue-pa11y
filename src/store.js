/* eslint-disable no-shadow, no-param-reassign */
/**
 * Vuex Store
 */
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import * as data from '../tests/pa11y/report.json';

Vue.use(Vuex);

/**
 * STATE
 */
const state = {
  data: '',
  results: [],
  errorList: [],
  siteList: [],
};

/**
 * MUTATIONS
 */
const mutations = {
  ADD_DATA(state, items) {
    state.data = items;
  },
  PROCESS_RESULTS(state, items) {
    state.results = items;
  },
  PROCESS_ERRORS(state, items) {
    state.errorList = items;
  },
  PROCESS_SITES(state, items) {
    state.siteList = items;
  },
};

/**
 * ACTIONS
 */
const actions = {
  // get the json generated from the  script
  reportData: ({ commit }) => {
    commit('ADD_DATA', data.default);
  },
  // make results easier to work with
  results: ({ commit }) => {
    let modified = _.map(state.data.results, function (value, index) {

      // add the site name to each result object
      value.forEach(value => value.site = index);
      return [value];
    });
    modified = _.flattenDeep(modified);

    commit('PROCESS_RESULTS', modified);
  },
  // create array of unique error objects with count, code, and violating urls present.
  errors: (context) => {
    // we map the object from getListOfErrors to our new objects
    const modified = Object.entries(context.getters.getListOfErrors)
      .map(([name, count]) => ({
        name,
        count,
        show: true,
        // we filter the results array for each error and create an array of
        // offending urls.
        site: state.results
          .filter(({ code }) => code === name)
          .reduce((list, { site }) => [...new Set([...list, ...[site]])], []),
        })
      );

    context.commit('PROCESS_ERRORS', modified);
  },
  sites: ({ commit }) => {
    const sites = Object.keys(state.data.results)
      .map(value => ({
          name: value,
          show: true,
          errors: 'test',
          warnings: 'test',
          notices: 'test',
        })
      );

    commit('PROCESS_SITES', sites);
  }
};

/**
 * GETTERS
 */
const getters = {
  // state helpers
  results: state => state.results,
  errorList: state => state.errorList,
  siteList: state => state.siteList,

  // a list of errors and their # of occurrences
  getListOfErrors: state => {
    return _.countBy(state.results, 'code');
  },
  // # of errors in list above
  uniqueErrors: (state, getters) => {
    return _.size(getters.getListOfErrors);
  },

};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});