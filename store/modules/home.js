const state = () => ({
  menu: [],
  hotPlace: []
})

const mutations = {
  setMenu(state, pos) {
    state.menu = pos
  },
  setHotPlace(state, pos) {
    state.hotPlace = pos
  }
}

const actions = {
  setMenu: ({ commit }, pos) => {
    commit('setMenu', pos)
  },
  setHotPlace: ({ commit }, pos) => {
    commit('setHotPlace', pos)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
