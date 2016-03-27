import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { UPDATE_NEWS, SET_PROGRESS, CHECK_EXIT } from '../mutation-types'

export let name = 'news'

var defaults = {
  list: [],
  count: 0,
  new_count: 0,
}

// initial state
export const state = Storage.get(name, defaults)

// mutations
export const mutations = {
  [UPDATE_NEWS](state, data) {
    state.list = data
    state.new_count = data.length - state.count
    state.count = data.length

    Storage.set(name, state)
  },

  [CHECK_EXIT](state) {
    state = Object.assign({}, defaults)
  },
}

// actions
export const actions = {
  // fetch news list from rss
  updateNews({ dispatch }) {

    // disallow headers in fetch
    var settings = { headers: null }

    dispatch(SET_PROGRESS, true)

    fetch.news(settings).then( data => {
      return dispatch(UPDATE_NEWS, data)
    }).catch( error => {
      return error
    }).then( () => {
      dispatch(SET_PROGRESS, false)
    })
  },
}
