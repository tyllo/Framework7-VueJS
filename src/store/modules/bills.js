import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { BILL_LIST, SET_PROGRESS, CHECK_EXIT } from 'store/mutation-types'

export let name = 'bills'

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
  [BILL_LIST]({ bills }, payload) {
    bills.date_at = payload.date_at
    bills.date_to = payload.date_to
    bills.message = payload.message
    bills.data = payload.data || []

    Storage.set(name, bills)
  },

  [CHECK_EXIT](state) {
    state.bills = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  getBillList({ dispatch, state }, dates) {
    var date_at = Math.min.apply(Math, dates)
    var date_to = Math.max.apply(Math, dates)

    var settings = {
      params: { date_at: date_at / 1000, date_to: date_to / 1000 }
    }

    dispatch(SET_PROGRESS, true)

    fetch.bill.list(settings).then( payload => {
      return dispatch(BILL_LIST, {
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
