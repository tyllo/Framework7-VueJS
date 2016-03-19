import load from 'promise?global,[name].promise!commons'
import store from 'store'
import template from './template.jade'
import style from './style.scss'

export let name = 'navbar'

export default res => load().then( ({ F7 }) => res({
  props: {
    title: { type: String, default: 'index.company.shortName' },
    state: { type: String, default: 'index' },
  },
  template: template({name, style}),
  computed: {
    progress() {
      return store.state.progress
    },

    isIndex() {
      return this.state === 'index'
    },

    icon() {
      return this.isIndex ? 'bars' : 'back'
    },
  },

  methods: {
    click() {
      this.$root.$broadcast('click:menu:bars')

      if (this.isIndex) {
        F7.openPanel('left')
      } else {
        window.history.back()
      }
    },
  },
}))
