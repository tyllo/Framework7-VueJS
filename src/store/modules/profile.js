import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { KONTR_INFO, SET_PROGRESS, CHECK_EXIT } from 'store/mutation-types'

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
    state.profile = payload
    Storage.set(name, state.profile)
  },

  [CHECK_EXIT](state) {
    state.profile = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getProfile({ dispatch, state }) {

    dispatch(SET_PROGRESS, true)

    fetch.profile().then( payload => {
      dispatch(KONTR_INFO, payload)
    }).catch( error => {
      return error
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },
}
