import { SET_PROGRESS } from '../mutation-types'

export let name = 'progress'

// initial state
export const state = {
  active: false,
}

// mutations
export const mutations = {
  [SET_PROGRESS](state, flag) {
    state.active = flag
  },
}

// actions
export const actions = {
  setProgress({ dispatch }, flag) {
    dispatch(SET_PROGRESS, flag)
  },
}
