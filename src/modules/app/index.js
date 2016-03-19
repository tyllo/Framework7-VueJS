/* global DEBUG */

import { F7 } from 'commons'
import store from 'store'
import template from './template.jade'

var name = 'app'

export default {
  name: name,
  template: template(),
  ready() {
    DEBUG && console.log('---> init', name)

    F7.init()
    var mainView = F7.addView(this.$els.view, {})
    store.mainView = mainView
  },
  computed: {
    auth: () => store.state.auth.secret,
  }
}
