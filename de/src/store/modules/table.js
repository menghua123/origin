/* jshint esversion :6 */

const state = {
  tableData: []
}

const mutations = {
  setData(state, data) {
    state.tableData = data
  }
}

const actions = {
  setData({ commit }, data) {
    commit('setData', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

