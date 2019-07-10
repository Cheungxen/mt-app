const state = () => ({
  position: {}
})

const mutations = {
  setPosition(state, pos) {
    state.position = pos
  }
}

const actions = {
  setPosition: ({ commit }, pos) => {
    commit('setPosition', pos)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
