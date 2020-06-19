export const state = () => ({
  item: {},
  show: false
})

export const mutations = {
  SET_DIALOG_DELETE(state, value) {
    state.show = value
  },
  SET_ITEM(state, item) {
    state.item = item
  }
}

export const actions = {
  changeDialog({ commit }, context) {
    commit('SET_DIALOG_DELETE', context)
  }
}
