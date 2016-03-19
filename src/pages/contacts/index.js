import * as dryTerminal from './dryTerminal'
import * as seaTerminal from './seaTerminal'

import store from 'store'
import i18n from './i18n'
import template from './template.jade'

var name = 'contacts'

store.actions.setLocal({name, i18n})

export default {
  name,
  template: template({name}),
  data: () => ({
    terminals: [seaTerminal, dryTerminal]
  }),
}
