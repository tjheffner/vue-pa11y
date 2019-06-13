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
  siteList: [],
  activeResult: {},
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
  PROCESS_SITES(state, items) {
    state.siteList = items;
  },
  PROCESS_ACTIVE_RESULT(state, item) {
    state.activeResult = item;
  }
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
  issues: (context) => {
    // we map the object from getListOfErrors to our new objects
    const modified = Object.entries(context.getters.getListOfIssues)
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

    context.commit('PROCESS_ISSUES', modified);
  },
  sites: ({ commit }) => {
    const sites = Object.entries(state.data.results)
      // .filter(([key, value]) => {
      // // do shit
      // return [key, stuff]
      // })
      .map(([key, value]) => {
        const reduction = value.reduce((acc, issue) => {
          acc[issue.type] += 1;
          return acc;
        }, {
          notice: 0,
          error: 0,
          warning: 0
        });

        return {
          name: key,
          show: true,
          ...reduction,
        }
      });



    // const sites = Object.keys(state.data.results)
    //   .map(value => ({
    //       name: value,
    //       show: true,
    //       errors: 'test',
    //       warnings: 'test',
    //       notices: _.filter(state.results, function(o) { return o.type === 'notice'; }),
    //     })
    //   );

    commit('PROCESS_SITES', sites);
  },
  setActiveResult: ({ commit }, item) => {
    commit('PROCESS_ACTIVE_RESULT', item);
  },
};

/**
 * GETTERS
 */
const getters = {
  // state helpers
  results: state => state.results,
  issueList: state => state.issueList,
  siteList: state => state.siteList,

  // a list of issues and their # of occurrences
  getListOfIssues: state => {
    return _.countBy(state.results, 'code');
  },
  // # of unique issues in list above
  uniqueIssues: (state, getters) => {
    return _.size(getters.getListOfIssues);
  },

};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});