import Storage from 'services/Storage'
import { CHANGE_ORDER } from 'store/mutation-types'

export let name = 'order'
var defaults = {
  containers: 'date',
  container: 'date',
  bills: 'date',
  bill: 'date',
  advance: 'date',
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  // общая для сортировки
  [CHANGE_ORDER](state, {orderName, name}) {
    console.log({orderName, name})
    state.order[name] = orderName
    Storage.set(name, state.order)
  },
}

// actions
export const actions = {
  // меняем имя сортируемого поля в state = data.name
  changeOrder({ dispatch }, data) {
    dispatch(CHANGE_ORDER, data)
  },
}
