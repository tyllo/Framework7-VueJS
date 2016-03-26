import { F7 } from 'commons'
import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { CHECK_LOGIN, CHECK_EXIT, RESET_AUTH } from 'store/mutation-types'

export let name = 'auth'

var defaults = {
  login: null,
  password: '',
  message: '',
  secret: '',
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [CHECK_LOGIN](state, data) {
    state.auth = data // Object.assign(state.auth, data)
    Storage.set(name, state.auth)
  },

  [CHECK_EXIT](state) {
    Storage.clear()
    state.auth = Object.assign({}, defaults)
  },

  [RESET_AUTH]({ auth }, name) {
    auth[name] = null
  },
}

// actions
export const actions = {
  login({ dispatch, store }, payload) {
    var { login, password, callback = null } = payload
    var settings = {
      headers: { Authorization: `Basic ${btoa(login + ':' + password)}` },
    }

    F7.showIndicator()
    dispatch(CHECK_LOGIN, {login, password})

    fetch.auth.login(settings).then( data => {
      data.password = password
      dispatch(CHECK_LOGIN, data)

      if (callback) { callback() }

      return true
    }).catch( error => {
      if (error.status === 401) {
        // TODO this.$router.go({name: 'index'})
      }

      return error
    }).then(F7.hideIndicator)
  },

  logout({ dispatch, state }) {
    F7.showIndicator()
    dispatch(RESET_AUTH, 'login')

    fetch.auth.logout().then( data => {
      dispatch(CHECK_EXIT, data)
    }).catch( error => {
      return error
    }).then(F7.hideIndicator)
  },

  reLogin({ actions, state }, { callback }) {
    actions.login({
      login: state.auth.login,
      password: state.auth.password,
      callback: callback,
    })
  },

  clearAuth({ dispatch }) {
    dispatch(RESET_AUTH, 'message')
  },
}