import { NOTI } from '@/utils/utils'
const _ = require('lodash')

export const state = () => ({
  waitEvent: null,
  deleteConfirm: false,
  editIndex: -1,
  dialogShow: false,
  items: [],
  userRow: null
})

export const getters = {
  getDeviceNameAll(state) {
    const nameAll = state.items.map((e) => e.name)
    const uniq = _.uniq(nameAll)
    return uniq
  }
}

export const mutations = {
  SET_DATA(state, res) {
    state.items = res.data.users
  },
  SET_DIALOG(state, value) {
    state.dialogShow = value
  },
  SET_DIALOG_DELETE(state, value) {
    state.deleteConfirm = value
  },
  INSERT_DATA(state, res) {
    state.items.push(res.data)
  },
  SET_WAIT_EVENT(state, item) {
    if (item) {
      state.editIndex = state.items.findIndex((e) => e.id === item.id)
    } else {
      state.editIndex = -1
    }
    state.waitEvent = item
  },
  DELETE_INDEX(state, index) {
    state.items.splice(index, 1)
  },
  EDIT_DATA(state, { id, res }) {
    const data = res.data
    const index = state.items.findIndex((e) => e.id === id)
    Object.assign(state.items[index], {
      ...data
    })
  },
  SET_USER_ROW(state, user) {
    state.userRow = user
  }
}

export const actions = {
  clickRow({ commit }, context) {
    commit('SET_USER_ROW', context)
  },
  async edit({ commit, dispatch, state }, context) {
    try {
      const res = await this.$axios.put('/user/' + state.waitEvent.id, {
        username: context.username,
        password: context.password,
        roleId: context.roleId
      })
      // console.log('success', res.data)
      commit('EDIT_DATA', { id: state.waitEvent.id, res })
      commit('SET_DIALOG', false)
      NOTI(dispatch, 'success', 'Edit user success')
      return true
    } catch (err) {
      NOTI(dispatch, 'error', err)
      console.log('fail', err)
      return false
    }
  },
  async deleteItem({ commit, state, dispatch }) {
    const id = state.waitEvent.id
    const index = state.items.findIndex((e) => e.id === id)
    try {
      await this.$axios.delete('/user/' + id)
      commit('SET_WAIT_EVENT', null)
      commit('DELETE_INDEX', index)
      NOTI(dispatch, 'success', 'Delete user success')
    } catch (err) {
      NOTI(dispatch, 'error', err)
      console.log(err)
    }
  },
  async insert({ commit, dispatch }, context) {
    try {
      const res = await this.$axios.post('/user', context)
      console.log('success', res.data)
      commit('INSERT_DATA', res)
      commit('SET_DIALOG', false)
      NOTI(dispatch, 'success', 'ADD new user')
      return true
    } catch (err) {
      console.log('fail', err)
      NOTI(dispatch, 'error', err)
      return false
    }
  },
  async getData({ commit, dispatch }) {
    try {
      const res = await this.$axios.get('/user')
      // console.log('success', res.data)
      commit('SET_DATA', res)
      NOTI(dispatch, 'success', 'Get user success')
    } catch (err) {
      console.log('fail', err)
      NOTI(dispatch, 'error', err)
    }
  },
  changeDialog({ commit }, context) {
    commit('SET_DIALOG', context)
  },
  setWaitEvent({ commit }, context) {
    commit('SET_WAIT_EVENT', context)
  }
}
