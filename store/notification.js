export const state = () => ({
  notifications: []
})

export const mutations = {
  PUSH_NOTI(state, notification) {
    state.notifications.push({
      ...notification,
      id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
    })
  },
  FILTER_NOTI(state, id) {
    state.notifications = state.notifications.filter((e) => {
      return e.id !== id
    })
  },
  POP_NOTI(state) {
    state.notifications.pop()
  }
}

export const actions = {
  ADD_NOTI({ commit }, notification) {
    commit('PUSH_NOTI', notification)
  },
  CLOSE_NOTI({ commit }, id) {
    commit('FILTER_NOTI', id)
  },
  POP_NOTI({ commit }) {
    commit('POP_NOTI')
  }
}
