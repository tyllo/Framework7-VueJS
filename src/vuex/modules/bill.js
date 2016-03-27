import Storage from 'services/Storage'
import Cache from 'services/CacheItem'
import fetch from 'services/fetch'
import { BILL_INFO, CHECK_EXIT, SET_PROGRESS } from '../mutation-types'

export let name = 'bill'

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
  [BILL_INFO](state, payload) {
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
  getBillInfo({ actions, dispatch }, number) {
    var settings = { params: { number } }

    if (cache.get(number)) {
      return dispatch(BILL_INFO, cache.get(number))
    }

    // reset bill info
    dispatch(BILL_INFO, Object.assign({}, defaults))
    dispatch(SET_PROGRESS, true)

    fetch.bill.info(settings).then( payload => {
      cache.set(number, payload.data)

      dispatch(BILL_INFO, {
        number,
        data: payload.data,
        message: payload.data,
      })
    }).catch( error => {
      // reLogin !!!
      if (error.status === 401) {
        actions.reLogin({
          callback: () => actions.getBillInfo(number)
        })
      }
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },
}
