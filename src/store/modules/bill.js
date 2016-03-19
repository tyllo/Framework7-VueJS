import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { BILL_INFO, SET_PROGRESS } from 'store/mutation-types'

export let name = 'bill'

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

    Storage.set(name, bill)
  },
}

// actions
export const actions = {
  getBillInfo({ dispatch, state }, number) {
    var settings = {
      params: { number },
      headers: {
        Authorization: `Bearer ${state.auth.secret}`,
        'Content-Type': 'application/json',
      },
      beforeSend: () => dispatch(SET_PROGRESS, true),
    }

    fetch.bill.info(settings).then( payload => {
      dispatch(BILL_INFO, {
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
