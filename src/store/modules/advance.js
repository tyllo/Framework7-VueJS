import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { ADVANCE_INFO, SET_PROGRESS } from 'store/mutation-types'

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
    state.advance = payload
    Storage.set(name, state.advance)
  },
}

// actions
export const actions = {
  getAdvance({ dispatch, state }, number) {
    var settings = {
      headers: {
        Authorization: `Bearer ${state.auth.secret}`,
        'Content-Type': 'application/json',
      },
      beforeSend: () => dispatch(SET_PROGRESS, true),
    }

    fetch.advance(settings).then( payload => {
      dispatch(ADVANCE_INFO, payload)
    }).catch( error => {
      return error
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },
}
