import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { CNT_LIST, SET_PROGRESS } from 'store/mutation-types'

export let name = 'containers'

var defaults = {
  date_at: '',
  date_to: '',
  message: '',
  data: [],
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [CNT_LIST]({ containers }, payload) {
    containers.date_at = payload.date_at
    containers.date_to = payload.date_to
    containers.message = payload.message
    containers.data = payload.data || []

    Storage.set(name, containers)
  },
}

// actions
export const actions = {
  getCntList({ dispatch, state }, dates) {
    var date_at = Math.min.apply(Math, dates)
    var date_to = Math.max.apply(Math, dates)

    var settings = {
      params: { date_at: date_at / 1000, date_to: date_to / 1000 },
      headers: {
        Authorization: `Bearer ${state.auth.secret}`,
        'Content-Type': 'application/json',
      },
      beforeSend: () => dispatch(SET_PROGRESS, true),
    }

    fetch.container.list(settings).then( payload => {
      return dispatch(CNT_LIST, {
        date_at, date_to,
        message: payload.message,
        data: payload.data,
      })
    }).catch( error => {
      return error
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },
}
