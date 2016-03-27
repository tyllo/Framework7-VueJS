/* globals revision */

import style from './style.scss'
import template from './template.jade'

var name = 'about'

export default {
  name: name,
  template: template({ name, style }),
  computed: {
    version() {
      // TODO: config
      return this.$t('about.version', {version: revision.version})
    }
  },
}
