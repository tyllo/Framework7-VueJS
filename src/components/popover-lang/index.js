/* globals DEBUG */

import load from 'promise?global,[name].promise!commons'
import store from 'store'
import template from './template.jade'
import style from './style.scss'

export let name = 'popover-lang'

export default res => load().then( ({ F7 }) => res({
  template: template({name, style}),
  computed: {
    langs() {
      return store.state.locales.langs
    }
  },
  events: {
    ['open:popup:langs'] (target) {
      F7.popover(this.$els.popover, target)
    },
    ['open:actionSheet:langs'] (target) {
      this.openActionSheet()
    },
  },
  methods: {
    changeLang(lang) {
      F7.closeModal(this.$els.popover)
      store.actions.changeLang(lang)
    },
    openActionSheet() {
      var buttons = this.$get('langs').map( lang => ({
        text: lang.value,
        onClick: () => this.changeLang(lang.key),
      }))

      buttons.unshift({text: this.$t('settings.change.lang'), label: true})
      F7.actions(buttons)
    }
  },
}))
