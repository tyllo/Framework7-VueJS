import { SET_PROGRESS } from 'store/mutation-types'

export let name = 'progress'

// initial state
export const state = false

// mutations
export const mutations = {
  [SET_PROGRESS](state, flag) {
    state.progress = flag
  },
}

// actions
export const actions = {
  setProgress({ dispatch }, flag) {
    dispatch(SET_PROGRESS, flag)
  },
}
