import load from 'promise?global,[name].promise!commons'
import formatSumm from 'mixins/filters/formatSumm'

import menu from './menu'
import style from './style.scss'
import template from './template.jade'

export let name = 'panel-left'

var image = '//vsct.info/assets/i/jpg/main_svcs_01.jpg'

export default resolve => load().then( ({ isIos }) => resolve({
  mixins: [formatSumm],
  template: template({name, style}),

  vuex: {
    getters: {
      companyName: state => state.auth.name_expeditor,
      summa: state => state.advance.summa,
      gravatar_hash: state => state.settings.gravatar_hash,
    },
  },

  data: () => ({isIos, menu, image}),

  computed: {
    src() {
      var hash = this.$get('gravatar_hash')
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
