import * as dryTerminal from './dryTerminal'
import * as seaTerminal from './seaTerminal'

import store from 'store'
import i18n from './i18n'
import template from './template.jade'

var name = 'contacts'
var typeList = {
  email: {
    icon: 'email',
    href: 'mailto:',
  },
  phone: {
    icon: 'call',
    href: 'tel:',
  },
  address: {
    icon: 'locate',
    href: 'http://maps.google.com?q=',
  },
}

store.actions.setLocal({name, i18n})

export default {
  name,
  template: template({name}),
  data: () => ({
    terminals: [seaTerminal, dryTerminal]
  }),
  filters: {
    normilize(list) {
      return list.map( item => {
        var type = item.type
        item.component = 'item-content'

        if (type !== undefined) {
          item.icon = 'empty'
        }

        if (Object.keys(typeList).indexOf(type) !== -1) {
          item.component = 'item-content-link'
          item.icon = typeList[type].icon
          item.href = typeList[type].href + item.text
          item.classLink = 'external'
        }

        if (item.content) {
          item.component = 'item-content-accordion'
          item.class = 'accordion-item'
        }

        return item
      })
    },
  },
}
