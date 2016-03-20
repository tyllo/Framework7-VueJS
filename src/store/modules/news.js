import Storage from 'services/Storage'
import fetch from 'services/fetch'
import { UPDATE_NEWS, SET_PROGRESS, CHECK_EXIT } from 'store/mutation-types'

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
  [UPDATE_NEWS]({news}, data) {
    news.list = data
    news.new_count = data.length - news.count
    news.count = data.length

    Storage.set(name, news)
  },

  [CHECK_EXIT](state) {
    state.news = Object.assign({}, defaults)
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
