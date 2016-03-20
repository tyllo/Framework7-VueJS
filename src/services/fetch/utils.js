/* globals DEBUG */

import { Vue } from 'commons'
import store from 'store'

export const URL = {
  SERVER: 'http://project-vsctxdraw.c9users.io',

  login: 'api/login',
  logout: 'api/logout',
  settings: 'api/settings',

  advance: 'api/AdvanceInfo',
  'bill-info': 'api/BillInfo',
  'bill-list': 'api/BillList',
  'container-info': 'api/CntInfo',
  'container-list': 'api/CntList',
  profile: 'api/KontrInfo',

  news: 'rss.html',
}

export function fetchFactory(params) {
  return settings => fetch(settings, params)
}

/**
 * @param  {Object} settings - from store
 * @param  {Object} params - from factory
 * @return {Promise}
 */
export function fetch(settings = {}, params) {
  var { fixture, parser } = params

  extendSettings(settings, params)

  if (DEBUG || store.state.auth.login === 'demo') {
    return fixture()
  }

  return Vue.http.get(settings).then(parser)
}

/**
 * @return <Object{fixture}>
 */
export let fixtures = requireAll(require.context('fixtures/', false, /\.js$/))

/************************************************
                   helpers
===============================================*/

// https://webpack.github.io/docs/context.html#require-context
function requireAll(requireContext) {
  return requireContext.keys().reduce( (fixtures, file) => {
    var name = file.match(/\.\/(.+?)\.js/)[1]

    fixtures[name] = requireContext(file).default

    return fixtures
  }, {})
}

function extendSettings(settings, { url }) {
  var headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${store.state.auth.secret}`,
  }

  // if null - disallow headers in fetch
  if (settings.headers !== null) {
    settings.headers = Object.assign(headers, settings.headers || {})
  }

  settings.url = url
}
