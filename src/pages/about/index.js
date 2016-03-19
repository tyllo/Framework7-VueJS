/* globals revision */

import store from 'store'
import i18n from './i18n'
import style from './style.scss'
import template from './template.jade'

var name = 'about'

store.actions.setLocal({name, i18n})

export default {
  name: name,
  template: template({name, style}),
  computed: {
    version() {
      return this.$t('about.version', {version: revision.version})
    }
  },
}
