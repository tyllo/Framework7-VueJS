import { Vue, VueResource } from 'commons'
import { URL } from './utils'

import advance from './advance'
import auth from './auth'
import containerList from './container-list'
import containerInfo from './container-info'
import billList from './bill-list'
import billInfo from './bill-info'
import news from './news'
import profile from './profile'
import settings from './settings'

Vue.use(VueResource)

Vue.http.options.root = URL.SERVER
Vue.http.options.crossOrigin = true

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
