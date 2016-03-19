import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { CNT_INFO, SET_PROGRESS } from 'store/mutation-types'

export let name = 'container'

var defaults = {
  number: null,
  message: '',
  data: [],
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [CNT_INFO]({ container }, { data, number }) {
    container.data = data
    container.number = number

    Storage.set(name, container)
  },
}

// actions
export const actions = {
  getCntInfo({ dispatch, state }, number) {
    var settings = {
      params: { number },
      headers: {
        Authorization: `Bearer ${state.auth.secret}`,
        'Content-Type': 'application/json',
      },
      beforeSend: () => dispatch(SET_PROGRESS, true),
    }

    fetch.container.info(settings).then( payload => {
      dispatch(CNT_INFO, {
        number,
        data: payload.data,
        message: payload.data,
      })
    }).catch( error => {
      return error
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },
}
