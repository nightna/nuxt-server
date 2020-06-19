const _ = require('lodash')

const getEleByName = (items, eleName) => {
  return items.map((e) => {
    if (e) {
      return e[eleName].name
    }
  })
}

module.exports.NOTI = (dispatch, type, text) => {
  return dispatch(
    'notification/ADD_NOTI',
    {
      color: type,
      text
    },
    { root: true }
  )
}

module.exports.sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

module.exports.getUuiqFromName = (items, name) => {
  const uniq = _.uniq(getEleByName(items, name))
  return uniq
}
