import store from 'store'
import i18n from './i18n'
import style from './style.scss'
import template from './template.jade'

var name = 'index'

store.actions.setLocal({name, i18n})

export default {
  name,
  template: template({style, name}),
  data: () => ({
    countClick: 0,
    className: 'bounceIn',
  }),
  ready() {
    if (store.state.auth.secret) {
      setTimeout(this.redirect, 1000)
    }
  },
  methods: {
    openLangs() {
      this.$root.$broadcast('open:popup:langs', this.$els.lang)
    },
    clickLogo() {
      var count = this.$get('countClick')
      this.$set('countClick', ++count)

      if ( !(count % 10) ) {
        this.$set('className', '')
        setTimeout( () => this.$set('className', 'bounceIn'), 10)
      }
    },
    redirect() {
      var route = {
        name: 'tabs',
        params: {tab: 'containers'}
      }

      this.$router.go(route)
    },
  },
}
