import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { KONTR_INFO, SET_PROGRESS, CHECK_EXIT } from '../mutation-types'

export let name = 'profile'

var defaults = {
  message: '',
  data: {},
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [KONTR_INFO](state, payload) {
    Object.assign(state, payload)
    Storage.set(name, state)
  },

  [CHECK_EXIT](state) {
    state = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getProfile({ actions, dispatch }) {

    dispatch(SET_PROGRESS, true)

    fetch.profile().then( payload => {
      dispatch(KONTR_INFO, payload)
    }).catch( error => {
      // reLogin !!!
      if (error.status === 401) {
        actions.reLogin({
          callback: () => actions.getProfile()
        })
      }
      return error
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },
}
