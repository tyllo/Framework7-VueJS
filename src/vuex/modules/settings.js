import Storage from 'services/Storage'
import fetch from 'services/fetch'
import {
  SET_SETTINGS,
  TOGGLE_NOTIFY_BY,
  SET_PROGRESS,
  CHECK_EXIT,
} from '../mutation-types'

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
    Object.assign(state, payload)
    Storage.set(name, state)
  },

  [TOGGLE_NOTIFY_BY](state, type) {
    state.notifyBy[type] = !state.notifyBy[type]
    Storage.set(name, state)
  },

  [CHECK_EXIT](state) {
    state = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getSettings({ actions, dispatch }) {

    dispatch(SET_PROGRESS, true)

    fetch.settings().then( payload => {
      dispatch(SET_SETTINGS, payload)
    }).catch( error => {
      // reLogin !!!
      if (error.status === 401) {
        actions.reLogin({
          callback: () => actions.getSettings()
        })
      }
      return error
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },

  // TODO: made actions for get and update settings from server
  updateSettings({ dispatch }, data) {
  },

  toggleNotify({ dispatch }, type) {
    dispatch(TOGGLE_NOTIFY_BY, type)
  },
}
