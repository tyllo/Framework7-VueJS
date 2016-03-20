import load from 'promise?global,[name].promise!commons'
import store from 'store'
import menu from './menu'
import style from './style.scss'
import template from './template.jade'

export let name = 'panel-left'

var image = '//vsct.info/assets/i/jpg/main_svcs_01.jpg'

export default resolve => load().then( ({ isIos }) => resolve({
  template: template({name, style}),
  data: () => ({isIos, menu, image}),
  computed: {
    companyName: () => store.state.auth.name_expeditor,
    summa: () => store.state.advance.summa,
    src() {
      var hash = store.state.settings.gravatar_hash
      return hash ? `//s.gravatar.com/avatar/${hash}?s=80` : null
    },
    style() {
      return `background-image:url(${this.$get('image')})`
    },
  },
  filters: {
    summaTitle(summa = 0) {
      return this.$t('advance.advanceTitle', {summa})
    },
  }
}))
