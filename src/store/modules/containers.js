import Storage from 'services/Storage'
import Cache from 'services/CacheList'
import fetch from 'services/fetch'
import { CNT_LIST, SET_PROGRESS, CHECK_EXIT } from 'store/mutation-types'

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
  [CNT_LIST]({ containers }, payload) {
    containers.date_at = payload.date_at
    containers.date_to = payload.date_to
    containers.message = payload.message
    containers.data = payload.data || []

    cache.set({
      date_at: containers.date_at,
      date_to: containers.date_to,
      data: containers.data,
    })

    Storage.set(name, containers)
  },

  [CHECK_EXIT](state) {
    state.containers = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getCntList({ actions, dispatch, state }, dates) {

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
