import Storage from 'services/Storage'
import fetch from 'services/fetch'
import {
  SET_SETTINGS,
  TOGGLE_NOTIFY_BY,
  SET_PROGRESS,
  CHECK_EXIT,
} from 'store/mutation-types'

export const name = 'settings'

const defaults = {
  email: '',
  phone: '',
  gravatar_email: '',
  gravatar_hash: '',
  notifyBy: {
    email: false,
    phone: false,
    avatar: false,
  }
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [SET_SETTINGS](state, payload) {
    state.settings = payload
    Storage.set(name, state.settings)
  },

  [TOGGLE_NOTIFY_BY]({ settings }, type) {
    settings.notifyBy[type] = !settings.notifyBy[type]
    Storage.set(name, settings)
  },

  [CHECK_EXIT](state) {
    state.settings = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getSettings({ dispatch, state }) {

    dispatch(SET_PROGRESS, true)

    fetch.settings().then( payload => {
      dispatch(SET_SETTINGS, payload)
    }).catch( error => {
      return error
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },

  // TODO: made actions for get and update settings from server
  updateSettings({ dispatch, state }, data) {
  },

  toggleNotify({ dispatch }, type) {
    dispatch(TOGGLE_NOTIFY_BY, type)
  },
}
