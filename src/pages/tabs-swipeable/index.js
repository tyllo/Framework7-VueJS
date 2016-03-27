import { F7, Dom7 } from 'commons'

import Containers from 'pages/containers/index/'
import Bills from 'pages/bills/index/'
import Advance from 'pages/advance'

import template from './template.jade'

var name = 'tabs'

export default {
  name: name,
  template: template({ name }),

  data: () => ({
    tab: 'containers',
    showExtendNavbar: false,
    show: {
      search: false,
      calendar: false,
      sort: false,
    },
  }),

  route: {
    data() {
      return {tab: this.$route.params.tab}
    }
  },

  ready() {
    this.$set('showExtendNavbar', this.$get('tab') !== 'advance' ? 1 : 0)

    Dom7(this.$els.containers).on('show', () => {
      this.$router.go({name, params: {tab: 'containers'}})
      this.$set('showExtendNavbar', true)
    })

    Dom7(this.$els.bills).on('show', () => {
      this.$router.go({name, params: {tab: 'bills'}})
      this.$set('showExtendNavbar', true)
    })

    Dom7(this.$els.advance).on('show', () => {
      this.$router.go({name, params: {tab: 'advance'}})
      this.$set('showExtendNavbar', false)
    })
  },

  watch: {
    // resolve to tab
    tab() {
      F7.showTab(`#tab-${this.$get('tab')}`)
      // scroll(0, 0)
    }
  },

  methods: {
    onShowCalendar() {
      this.$set('show.calendar', true)
    },

    onShowSearch() {
      this.$set('show.search', true)
    },

    onShowOrder() {
      this.$root.$broadcast('open:popup:order', {
        target: this.$els.popup,
        name: this.tab,
      })
    },
  },

  components: {
    Containers,
    Bills,
    Advance,
  },
}
