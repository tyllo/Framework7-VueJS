import load from 'promise?global,[name].promise!commons'
import { changeOrder } from 'vuex/actions'

import template from './template.jade'
import style from './style.scss'

export let name = 'popover-order'

export default res => load().then( ({ F7 }) => res({
  template: template({ name, style }),

  vuex: {
    actions: { changeOrder },

    getters: {
      locales: state => state.locales,
    },
  },

  data: () => ({
    name: null,
  }),

  computed: {
    sortList() {
      var name = this.$get('name')
      return name ? this.$get('locales')[name].sortList : {}
    }
  },

  events: {
    ['open:popup:order'] ({ target, name }) {
      this.$set('name', name)
      F7.popover(this.$els.popover, target)
    }
  },

  methods: {
    changeOrder(orderName) {
      this.changeOrder({
        orderName,
        name: this.$get('name'),
      })

      F7.closeModal(this.$els.popover)
    },
  },
}))
