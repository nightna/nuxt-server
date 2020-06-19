export const state = () => ({
  editStore: '',
  editItem: {},
  editIndex: -1
})

export const getters = {}
export const mutations = {
  SET_WAIT_ACTIONS(state, context) {
    state.editItem = context.item
    state.editIndex = context.index
  }
}
export const actions = {}
