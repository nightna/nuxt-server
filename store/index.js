export const state = () => ({
  msgTestApi: '',
  isError: false,
  urlUnipiWrite: 'http://192.168.1.74:1880/modbus/flex/write/'
})

export const getters = {}

export const mutations = {
  SET_MSG_API(state, { suc, msg }) {
    console.log('msg')

    state.msgTestApi = msg
    state.isError = !suc
  }
}

function reSetMsg(commit) {
  setTimeout(() => {
    commit('SET_MSG_API', '')
  }, 5000)
}

export const actions = {
  async test_api({ commit }) {
    try {
      const res = await this.$axios.get('/api/')
      console.log('success', res)
      commit('SET_MSG_API', { suc: true, msg: res.data.msg })
      reSetMsg(commit)
    } catch (err) {
      console.log('fail', err)

      commit('SET_MSG_API', { suc: false, msg: 'error' })
      reSetMsg(commit)
    }
  }
}
