import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { BILL_INFO, SET_PROGRESS, CHECK_EXIT } from 'store/mutation-types'

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

  [CHECK_EXIT](state) {
    state.bill = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getBillInfo({ dispatch, state }, number) {
    var settings = { params: { number } }

    if ( state[name].number === number) {
      return
    }

    dispatch(CHECK_EXIT)
    dispatch(SET_PROGRESS, true)

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
