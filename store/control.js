export const actions = {
  async SEND_COMMAND({ dispatch }, DATA) {
    try {
      const res = await this.$axios.post(DATA.url, DATA.command, {
        useCredentails: true
      })
      dispatch(
        'notification/ADD_NOTI',
        {
          color: 'success',
          text: `${DATA.name} is ${DATA.command.value ? 'ON' : 'OFF'}`
        },
        { root: true }
      )
      // console.log(res)

      return res
    } catch (err) {
      console.log(err)

      dispatch(
        'notification/ADD_NOTI',
        {
          color: 'error',
          text: `${DATA.name} can not to server`
        },
        { root: true }
      )
      return { err: true }
    }
  }
}
