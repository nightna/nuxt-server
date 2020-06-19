import _ from 'lodash'
import { NOTI, getUuiqFromName } from '@/utils/utils'

export const state = () => ({
  device: {},
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
    { text: 'Address', value: 'address' },
    { text: 'Device', value: 'deviceName' },
    { text: 'Type', value: 'typeName' },
    { text: 'createdAt', value: 'createdAt' },
    { text: 'Actions', value: 'actions', sortable: false }
  ],
  tableItems: []
})

export const getters = {
  getDeviceName(state) {
    return getUuiqFromName(state.tableItems, 'Device')
  },
  getAddressByGroupDevice(state) {
    return (name) => {
      return _.filter(state.tableItems, (e) => e.Device.name === name)
    }
  },
  getAddressByType(state) {
    return (typeId) => _.filter(state.tableItems, (e) => e.type_id === typeId)
  }
}

export const mutations = {
  SET_DATA(state, res) {
    state.tableItems = res.data
  },
  SET_DIALOG(state, value) {
    if (!value) state.editIndex = -1
    state.dialogShow = value
  },
  SET_DIALOG_DELETE(state, value) {
    state.deleteConfirm = value
  },
  INSERT_DATA(state, res) {
    state.tableItems.push(res.data[0])
    console.log(state.tableItems)
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
  },
  SET_DEVICE(state, device) {
    state.device = device
  }
}

export const actions = {
  changeDevice({ commit, rootState }, context) {
    const allDevice = rootState.device.tableItems
    commit(
      'SET_DEVICE',
      allDevice.find((e) => e.name === context)
    )
  },
  async edit({ commit, dispatch, state }, context) {
    try {
      const res = await this.$axios.put(
        '/modbus/addressModbus/' + state.waitEvent.id,
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
      NOTI(dispatch, 'success', 'Edit address modbus success')
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
      await this.$axios.delete('/modbus/addressModbus/' + id)
      commit('SET_WAIT_EVENT', null)
      commit('SET_DIALOG_DELETE', false)
      commit('DELETE_INDEX', index)
      NOTI(dispatch, 'success', 'Delete address modbus success')
    } catch (err) {
      NOTI(dispatch, 'error', err)
      console.log(err)
    }
  },
  async insert({ commit, dispatch }, context) {
    try {
      console.log(context)
      const res = await this.$axios.post('/modbus/addressModbus', context)
      console.log('success', res.data)
      commit('INSERT_DATA', res)
      commit('SET_DIALOG', false)
      NOTI(dispatch, 'success', 'ADD new address modbus')
      return true
    } catch (err) {
      console.log('fail', err)
      NOTI(dispatch, 'error', err)
      return false
    }
  },
  async getData({ commit, dispatch, rootState }) {
    try {
      const res = await this.$axios.get('/modbus/addressModbus')
      // console.log('success', res.data)
      commit('SET_DATA', res)
      NOTI(dispatch, 'success', 'Get address modbus success')
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
