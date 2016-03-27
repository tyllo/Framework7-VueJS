import Storage from 'services/Storage'
import Cache from 'services/CacheItem'
import fetch from 'services/fetch'
import { CNT_INFO, SET_PROGRESS, CHECK_EXIT } from '../mutation-types'

export let name = 'container'

var cache = new Cache(name)
var defaults = {
  number: null,
  message: '',
  data: [],
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [CNT_INFO](state, payload) {
    state.data = payload.data
    state.number = payload.number
    state.message = payload.message

    Storage.set(name, state)
  },

  [CHECK_EXIT](state) {
    state = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getCntInfo({ actions, dispatch }, number) {
    var settings = { params: { number } }

    if (cache.get(number)) {
      return dispatch(CNT_INFO, cache.get(number))
    }

    // reset container info
    dispatch(CNT_INFO, Object.assign({}, defaults))
    dispatch(SET_PROGRESS, true)

    fetch.container.info(settings).then( payload => {
      cache.set(number, payload.data)

      dispatch(CNT_INFO, {
        number,
        data: payload.data,
        message: payload.data,
      })
    }).catch( error => {
      // reLogin !!!
      if (error.status === 401) {
        actions.reLogin({
          callback: () => actions.getCntInfo(number)
        })
      }
      return error
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },
}
