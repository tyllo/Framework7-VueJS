import style from './style.scss'
import template from './template.jade'

var name = 'index'

export default {
  name,
  template: template({style, name}),

  vuex: {
    getters: {
      auth: state => state.auth.login,
    },
  },

  data: () => ({
    countClick: 0,
    className: 'bounceIn',
  }),

  ready() {
    if (this.auth) {
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
