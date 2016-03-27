import Storage from 'services/Storage'
import Cache from 'services/CacheItem'
import fetch from 'services/fetch'
import { BILL_INFO, SET_PROGRESS, CHECK_EXIT } from 'store/mutation-types'

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
  [BILL_INFO]({ bill }, payload) {
    bill.data = payload.data
    bill.number = payload.number
    bill.message = payload.message

    cache.set(payload.number, bill.data)

    Storage.set(name, bill)
  },

  [CHECK_EXIT](state) {
    state.bill = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getBillInfo({ actions, dispatch, state }, number) {
    var settings = { params: { number } }

    if (cache.get(number)) {
      return dispatch(BILL_INFO, cache.get(number))
    }

    // reset bill info
    dispatch(BILL_INFO, Object.assign({}, defaults))
    dispatch(SET_PROGRESS, true)

    fetch.bill.info(settings).then( payload => {
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

/************************************************
                   helpers
===============================================*/

function getFromCache({ cache }, number) {
  return cache[number] ? {
    number,
    data: cache[number],
    message: `Get ${ name } ${ number } from cache`,
  } : null
}
