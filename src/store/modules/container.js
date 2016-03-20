import Storage from 'services/Storage'
import Cache from 'services/CacheItem'
import fetch from 'services/fetch'
import { CNT_INFO, SET_PROGRESS, CHECK_EXIT } from 'store/mutation-types'

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
  [CNT_INFO]({ container }, payload) {
    container.data = payload.data
    container.number = payload.number
    container.message = payload.message

    cache.set(payload.number, container.data)

    Storage.set(name, container)
  },

  [CHECK_EXIT](state) {
    state.container = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getCntInfo({ actions, dispatch, state }, number) {
    var settings = { params: { number } }

    if (cache.get(number)) {
      return dispatch(CNT_INFO, cache.get(number))
    }

    // reset container info
    dispatch(CNT_INFO, Object.assign({}, defaults))
    dispatch(SET_PROGRESS, true)

    fetch.container.info(settings).then( payload => {
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
