/* globals DEBUG */

import load from 'promise?global,[name].promise!commons'
import store from 'store'
import template from './template.jade'
import style from './style.scss'

export let name = 'popover-order'

export default res => load().then( ({ F7 }) => res({
  template: template({name, style}),
  data: () => ({
    name: null,
  }),
  computed: {
    sortList() {
      var current = store.state.locales.current
      var name = this.$get('name')
      return name ? current[name].sortList : {}
    }
  },
  events: {
    ['open:popup:order'] ({target, name}) {
      DEBUG && console.log('open:popup:order')
      this.$set('name', name)
      F7.popover(this.$els.popover, target)
    }
  },
  methods: {
    changeOrder(orderName) {
      store.actions.changeOrder({
        orderName,
        name: this.$get('name'),
      })
      F7.closeModal(this.$els.popover)
    },
  },
}))
