import moment from 'moment'

export const state = () => ({
  waterLogs: {
    headers: [
      {
        text: 'Header',
        align: 'start',
        value: 'header'
      },
      { text: 'Text', value: 'text' },
      { text: 'Timestamp', value: 'timestamp' }
    ],
    items: []
  },
  enegyLogs: {
    headers: [
      {
        text: 'Header',
        align: 'start',
        value: 'header'
      },
      { text: 'Text', value: 'text' },
      { text: 'Timestamp', value: 'timestamp' }
    ],
    items: []
  }
})

export const mutations = {
  ADD_LOGS(state, value) {
    state[value.target].items.unshift({
      header: value.header,
      text: value.text,
      timestamp: moment().format('hh:mm:ss DD/MM/YYYY')
    })
  },
  RESET_LOGS(state) {
    state.waterLogs.items = []
    state.enegyLogs.items = []
  }
}
