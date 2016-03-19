/* globals DEBUG */

import { Vue } from 'commons'
import auth from 'fixtures/auth'

export default { login, logout }

export function login(settings = {}) {
  settings = Object.assign({url: 'api/login'}, settings)
  if (DEBUG) { return auth.login() }
  return Vue.http.get(settings).then( ({ data }) => data )
}

export function logout(settings = {}) {
  settings = Object.assign({url: 'api/logout'}, settings)
  if (DEBUG) { return auth.logout() }
  return Vue.http.get(settings).then( ({ data }) => data )
}
