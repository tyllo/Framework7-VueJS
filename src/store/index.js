/* globals NODE_ENV, DEBUG */

import { Vue, Vuex } from 'commons'

Vue.use(Vuex)
Vue.config.debug = DEBUG

const STORE = {
  state: {},
  actions: [],
  mutations: [],
  strict: (NODE_ENV === 'develope'),
  middlewares: (NODE_ENV === 'develope') ? [Vuex.createLogger()] : []
}

var modules = requireAll(require.context('./modules/', false, /\.js$/))

export default new Vuex.Store(modules.reduce(extend, STORE))

// extend STORE
function extend(STORE, module) {
  var { name, state, actions, mutations } = module

  STORE.state[name] = state
  STORE.actions.push(actions)
  STORE.mutations.push(mutations)

  return STORE
}

// https://webpack.github.io/docs/context.html#require-context
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext)
}
