import { NOTI } from '@/utils/utils'
const _ = require('lodash')

export const state = () => ({
  waitEvent: null,
  deleteConfirm: false,
  editIndex: -1,
  dialogShow: false,
  tableHeader: [
    {
      text: 'ID',
      align: 'start',
      value: 'id'
    },
    { text: 'name', value: 'name' },
    { text: 'IP', value: 'ip' },
    { text: 'Port', value: 'port' },
    { text: 'Unit Id', value: 'unitId' },
    { text: 'createdAt', value: 'createdAt' },
    { text: 'Actions', value: 'actions', sortable: false }
  ],
  tableItems: []
})

export const getters = {
  getDeviceNameAll(state) {
    const nameAll = state.tableItems.map((e) => e.name)
    const uniq = _.uniq(nameAll)
    return uniq
  }
}

export const mutations = {
  SET_DATA(state, res) {
    state.tableItems = res.data
  },
  SET_DIALOG(state, value) {
    state.dialogShow = value
  },
  SET_DIALOG_DELETE(state, value) {
    state.deleteConfirm = value
  },
  INSERT_DATA(state, res) {
    state.tableItems.push(res.data)
  },
  SET_WAIT_EVENT(state, item) {
    if (item) {
      state.editIndex = state.tableItems.findIndex((e) => e.id === item.id)
    } else {
      state.editIndex = -1
    }
    state.waitEvent = item
  },
  DELETE_INDEX(state, index) {
    state.tableItems.splice(index, 1)
  },
  EDIT_DATA(state, { id, res }) {
    const data = res.data.data
    const index = state.tableItems.findIndex((e) => e.id === id)
    Object.assign(state.tableItems[index], {
      ip: data.ip,
      port: data.port,
      name: data.name,
      unitId: data.unitId
    })
  }
}

export const actions = {
  async edit({ commit, dispatch, state }, context) {
    try {
      const res = await this.$axios.put(
        '/modbus/device/' + state.waitEvent.id,
        {
          name: context.name,
          ip: context.ip,
          port: context.port,
          unitId: context.unitId
        }
      )
      // console.log('success', res.data)
      commit('EDIT_DATA', { id: state.waitEvent.id, res })
      commit('SET_DIALOG', false)
      NOTI(dispatch, 'success', 'Edit device success')
      return true
    } catch (err) {
      NOTI(dispatch, 'error', err)
      console.log('fail', err)
      return false
    }
  },
  async deleteItem({ commit, state, dispatch }) {
    const id = state.waitEvent.id
    const index = state.tableItems.findIndex((e) => e.id === id)
    try {
      await this.$axios.delete('/modbus/device/' + id)
      commit('SET_WAIT_EVENT', null)
      commit('SET_DIALOG_DELETE', false)
      commit('DELETE_INDEX', index)
      NOTI(dispatch, 'success', 'Delete device success')
    } catch (err) {
      NOTI(dispatch, 'error', err)
      console.log(err)
    }
  },
  async insert({ commit, dispatch }, context) {
    try {
      const res = await this.$axios.post('/modbus/device', context)
      // console.log('success', res.data)
      commit('INSERT_DATA', res)
      commit('SET_DIALOG', false)
      NOTI(dispatch, 'success', 'ADD new device')
      return true
    } catch (err) {
      console.log('fail', err)
      NOTI(dispatch, 'error', err)
      return false
    }
  },
  async getData({ commit, dispatch }) {
    try {
      const res = await this.$axios.get('/modbus/device')
      //   console.log('success', res.data)
      commit('SET_DATA', res)
      NOTI(dispatch, 'success', 'Get device success')
    } catch (err) {
      console.log('fail', err)
      NOTI(dispatch, 'error', err)
    }
  },
  changeDialog({ commit }, context) {
    commit('SET_DIALOG', context)
  },
  changeDialogDelete({ commit }, context) {
    commit('SET_DIALOG_DELETE', context)
  },
  setWaitEvent({ commit }, context) {
    commit('SET_WAIT_EVENT', context)
  }
}
