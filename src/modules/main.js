/* globals revision */

import load from 'promise?global,[name].promise!commons'
import style from 'promise?global,[name].promise!android'
import store from 'store'
import Storage from 'services/Storage'
import app from 'modules/app'

import { router } from 'initials'

// just onetime for render in www
import 'styles/main.scss'

// clear bad cache from Storage
if ((revision.branch !== 'dev') && (revision.count < 4)) {
  Storage.clear()
}

style().then(load).then( commons => {
  var { Vue, i18n } = commons

  Vue.use(i18n, {
    lang: 'current',
    locales: store.state.locales,
  })

  router.start(Vue.extend({
    components: { app }
  }), document.body)
})
