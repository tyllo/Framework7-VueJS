import Storage from 'services/Storage'
import Cache from 'services/CacheList'
import fetch from 'services/fetch'
import { CNT_LIST, SET_PROGRESS, CHECK_EXIT } from '../mutation-types'

export let name = 'containers'

var cache = new Cache(name)
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
  [CNT_LIST](state, payload) {
    state.date_at = payload.date_at
    state.date_to = payload.date_to
    state.message = payload.message
    state.data = payload.data || []

    Storage.set(name, state)
  },

  [CHECK_EXIT](state) {
    state = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getCntList({ actions, dispatch }, dates) {

    if (!dates) { return }

    var date_at = Math.min.apply(Math, dates)
    var date_to = Math.max.apply(Math, dates)

    var settings = {
      params: { date_at: date_at / 1000, date_to: date_to / 1000 },
    }

    if (cache.isIn({ date_at, date_to })) {
      return dispatch(CNT_LIST, cache.get({ date_at, date_to }))
    }

    // reset bills info
    dispatch(CNT_LIST, Object.assign({}, defaults))
    dispatch(SET_PROGRESS, true)

    fetch.container.list(settings).then( payload => {
      cache.set({
        date_at, date_to,
        data: payload.data,
      })

      return dispatch(CNT_LIST, {
        date_at, date_to,
        message: payload.message,
        data: payload.data,
      })
    }).catch( error => {
      // reLogin !!!
      if (error.status === 401) {
        actions.reLogin({
          callback: () => actions.getCntList(dates)
        })
      }
      return error
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },
}
