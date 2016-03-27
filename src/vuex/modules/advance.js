import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { ADVANCE_INFO, CHECK_EXIT, SET_PROGRESS } from '../mutation-types'

export let name = 'advance'

var defaults = {
  message: '',
  summa: '',
  summa_bill: '',
  advance: [],
  debt: [],
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [ADVANCE_INFO](state, payload) {
    state = payload
    Storage.set(name, state)
  },

  [CHECK_EXIT](state) {
    state = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getAdvance({ /*actions,*/ dispatch }) {
    dispatch(SET_PROGRESS, true)

    fetch.advance().then( payload => {
      dispatch(ADVANCE_INFO, payload)
    }).catch( error => {
      // reLogin !!!
      if (error.status === 401) {
        actions.reLogin({
          callback: () => actions.getAdvance()
        })
      }
      return error
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },
}
