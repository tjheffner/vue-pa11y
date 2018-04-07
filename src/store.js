/* eslint-disable no-shadow, no-param-reassign */
/**
 * Vuex Store
 */
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import * as data from '../pa11y-report.json';

Vue.use(Vuex);

/**
 * STATE
 */
const state = {
  data: '',
  results: [],
};

/**
 * MUTATIONS
 */
const mutations = {
  ADD_DATA(state, items) {
    state.data = items;
  },
  ADD_RESULTS(state, items) {
    state.results = items;
  },
};

/**
 * ACTIONS
 */
const actions = {
  // get the json generated from the `npm run report` script
  pa11yData: ({ commit }) => {
    commit('ADD_DATA', data );
  },
  processResults: ({ commit }) => {

    let modified = _.map(state.data.results, function(value, index) {
      return [value];
    });

    modified = _.flattenDeep(modified);

    commit('ADD_RESULTS', modified);
  },
};

/**
 * GETTERS
 */
const getters = {
  getListOfErrors: state => {
    return _.countBy(state.results, 'code');
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});