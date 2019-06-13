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
  issueList: [],
  activeResult: null,
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
  PROCESS_ISSUES(state, items) {
    state.issueList = items;
  },
  PROCESS_ACTIVE_RESULT(state, item) {
    state.activeResult = item;
  }
};

/**
 * ACTIONS
 */
const actions = {
  // get the json generated from pa11y-ci
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
  issues: ({ commit, getters }) => {
    // we map the object from getListOfErrors to our new objects
    const modified = Object.entries(getters.getListOfIssues)
      .map(([name, count]) => ({
          name,
          count,
          show: true,
          // check results array for first instance of each to note type (warning, error, notice)
          type: (state.results.find(result => result.code === name)).type,
          // we filter the results array for each error and create an array of offending urls.
          site: state.results
            .filter(({ code }) => code === name)
            .reduce((list, { site }) => [...new Set([...list, ...[site]])], []),
        })
      );

    commit('PROCESS_ISSUES', modified);
  },
  // sets click site as active site, displaying individual results.
  setActiveResult: ({ commit }, item) => {
    commit('PROCESS_ACTIVE_RESULT', item);
  },
};

/**
 * GETTERS
 */
const getters = {
  // a list of issues and their # of occurrences
  getListOfIssues: state => {
    return _.countBy(state.results, 'code');
  },
  // # of unique issues in list above
  uniqueIssues: (state, getters) => {
    return _.size(getters.getListOfIssues);
  },
  // full count of warnings, notices, errors for filter stats.
  getStats: state => {
    return _.countBy(state.results, 'type')
  },
  // helper function to filter the result list based on issue visibility.
  getActiveIssues: (state, key, type) => {
    return state.results.filter(result => {
      return state.issueList.some(issue => {
        return result.site === key && result.type === type && result.code === issue.name && issue.show;
      })
    });
  },
  getSiteList: state => {
    return Object.keys(state.data.results)
      .map(key => {
        return {
          name: key,
          show: true,
          warning: getters.getActiveIssues(state, key, 'warning').length,
          notice: getters.getActiveIssues(state, key, 'notice').length,
          error: getters.getActiveIssues(state, key, 'error').length,
        }
      });
  },
  // get the full results for a site based on activeResult selection.
  getActiveResults: state => {
    if (state.activeResult) {
      return state.results.filter(result => {
        return state.issueList.some(issue => {
          return result.site === state.activeResult.name && result.code === issue.name && issue.show;
        })
      })
    }
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});