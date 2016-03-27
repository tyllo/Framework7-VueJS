/* globals NODE_ENV, DEBUG */

import { Vue, Vuex } from 'commons'
import createLogger from 'vuex/logger'

Vue.use(Vuex)
Vue.config.debug = DEBUG

const STORE = {
  state: {},
  actions: [],
  mutations: [],
  modules: requireAll(require.context('./modules/', false, /\.js$/)),
  strict: (NODE_ENV === 'develope'),
  middlewares: (NODE_ENV === 'develope') ? [createLogger()] : []
}

export default new Vuex.Store(STORE)

/************************************************
                   helpers
===============================================*/

// https://webpack.github.io/docs/context.html#require-context
function requireAll(requireContext) {
  return requireContext.keys().reduce( (fixtures, file) => {
    var name = file.match(/\.\/(.+?)\.js/)[1]

    fixtures[name] = requireContext(file)

    return fixtures
  }, {})
}
