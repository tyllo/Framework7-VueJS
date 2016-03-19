import { Vue, VueResource } from 'commons'
import advance from './advance'
import auth from './auth'
import containerList from './container-list'
import containerInfo from './container-info'
import billList from './bill-list'
import billInfo from './bill-info'
import news from './news'
import profile from './profile'
import settings from './settings'

var server = 'http://project-vsctxdraw.c9users.io'

Vue.use(VueResource)

Vue.http.options.root = server
Vue.http.options.crossOrigin = true

// Vue.http.options.beforeSend = (request, options) => {
// }

// Vue.http.options.error = function(data, status, request) {
//   DEBUG && console.log('>>>> fetch error [%s]: %o', status, data)
//   return data
// }

export default {
  advance,
  auth,
  container: {
    list: containerList,
    info: containerInfo,
  },
  bill: {
    list: billList,
    info: billInfo,
  },
  news,
  profile,
  settings,
}
