import { F7 } from 'commons'
import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { CHECK_LOGIN, CHECK_EXIT, RESET_AUTH } from 'store/mutation-types'

export let name = 'auth'

var defaults = {
  login: '',
  password: '',
  message: '',
  secret: '',
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [CHECK_LOGIN](state, data) {
    state.auth = Object.assign(state.auth, data)
    Storage.set(name, state.auth)
  },

  [CHECK_EXIT](state) {
    Storage.clear()
  },

  [RESET_AUTH](state) {
    state.auth = defaults
  },
}

// actions
export const actions = {
  login({ dispatch }, payload) {
    var { login, password, redirect } = payload
    var settings = {
      headers: { Authorization: `Basic ${btoa(login + ':' + password)}` },
      beforeSend: F7.showIndicator,
    }

    fetch.auth.login(settings).then( data => {
      redirect()
      return dispatch(CHECK_LOGIN, data)
    }).catch( ({ data }) => {
      return dispatch(CHECK_LOGIN, data)
    }).then(F7.hideIndicator)
  },

  logout({ dispatch, state }) {
    var settings = {
      headers: {
        Authorization: `Bearer ${state.auth.secret}`,
        'Content-Type': 'application/json',
      },
      beforeSend: F7.showIndicator,
    }

    dispatch(RESET_AUTH)

    fetch.auth.logout(settings).then( data => {
      dispatch(CHECK_EXIT, data)
    }).catch( error => {
      return error
    }).then(F7.hideIndicator)
  },
}
