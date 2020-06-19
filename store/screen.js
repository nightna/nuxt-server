import _ from 'lodash'
import { NOTI, sleep } from '@/utils/utils'
// import { NOTI } from '@/utils/utils'

export const state = () => ({
  tableItems: [],
  userPermission: [],
  dialogShow: false,
  saving: false
})

export const getters = {
  userPerAndScreen(state) {
    const newMap = _.map(state.tableItems, (e) => {
      return {
        ...e,
        flag:
          state.userPermission.find((p) => p.screenId === e.id)?.flag || false
      }
    })
    return newMap
  }
}

export const mutations = {
  SET_DATA(state, res) {
    state.tableItems = res.data
  },
  SET_USERPERMISSION(state, res) {
    state.userPermission = res.data
  },
  SET_FLAG(state, item) {
    item.flag = !item.flag
  },
  SET_DIALOG(state, value) {
    state.dialogShow = value
  },
  INSERT_DATA(state, res) {
    state.tableItems.push(res.data)
  },
  EDIT_DATA(state, { id, res }) {
    const data = res.data.data
    const index = state.tableItems.findIndex((e) => e.id === id)
    Object.assign(state.tableItems[index], {
      screenId: data.screenId,
      name: data.name
    })
  },
  DELETE_INDEX(state, id) {
    const index = state.tableItems.findIndex((e) => e.id === id)
    state.tableItems.splice(index, 1)
  },
  SET_SAVING(state, val) {
    state.saving = val
  }
}

export const actions = {
  async deleteItem({ commit, dispatch }, context) {
    const id = context.id
    try {
      await this.$axios.delete('/screen/' + id)
      commit('DELETE_INDEX', id)
      NOTI(dispatch, 'success', 'Delete screen success')
    } catch (err) {
      NOTI(dispatch, 'error', err)
      console.log(err)
    }
  },
  async edit({ commit, dispatch }, context) {
    try {
      const res = await this.$axios.put('/screen/' + context.editItem.id, {
        screenId: context.data.screenId,
        name: context.data.name
      })
      // console.log('success', res.data)
      commit('EDIT_DATA', { id: context.editItem.id, res })
      commit('SET_DIALOG', false)
      NOTI(dispatch, 'success', 'Edit screen success')
      return true
    } catch (err) {
      NOTI(dispatch, 'error', err)
      console.log('fail', err)
      return false
    }
  },
  async insert({ commit, dispatch }, context) {
    try {
      const res = await this.$axios.post('/screen', context)
      //   console.log('success', res.data)
      commit('INSERT_DATA', res)
      commit('SET_DIALOG', false)
      NOTI(dispatch, 'success', 'ADD new screen')
      return true
    } catch (err) {
      console.log('fail', err)
      NOTI(dispatch, 'error', err)
      return false
    }
  },
  async save({ commit, dispatch }, context) {
    const data = {
      userId: context.userRow.id,
      screenPermission: context.perItem.map((e) => {
        return {
          id: e.id,
          flag: e.flag
        }
      })
    }

    try {
      await this.$axios.post('/userscreen/upsert', data)
      // const time = new Date()
      await sleep(5000)
      // console.log(new Date() - time)

      const res = await this.$axios.post('/userscreen/user_permission', {
        id: context.userRow.id
      })

      // console.log('success', res.data)
      commit('SET_USERPERMISSION', res)
      NOTI(dispatch, 'success', `Save ${context.userRow.username} success`)
    } catch (err) {
      console.log(err)
      NOTI(dispatch, 'success', err)
    }
  },
  async getPermission({ commit, dispatch }, context) {
    try {
      const res = await this.$axios.post('/userscreen/user_permission', {
        id: context
      })
      // console.log('success', res.data)
      commit('SET_USERPERMISSION', res)
      NOTI(dispatch, 'success', 'Get permission success')
    } catch (err) {
      console.log('fail', err)
      NOTI(dispatch, 'error', err)
    }
  },
  async getData({ commit, dispatch }) {
    try {
      const res = await this.$axios.get('/screen')
      // console.log('success', res.data)
      commit('SET_DATA', res)
      NOTI(dispatch, 'success', 'Get screen success')
    } catch (err) {
      console.log('fail', err)
      NOTI(dispatch, 'error', err)
    }
  }
}
