/* globals DEBUG */

import store from 'store'
import dateMixin from 'mixins/filters/date'
import template from './template.jade'
import style from './style.scss'

var name = 'container-info'

export default {
  name,
  mixins: [dateMixin],
  template: template({name, style}),
  data: () => ({
    number: '',
  }),
  route: {
    data() {
      var number = this.$route.params.number.trim()
      store.actions.getCntInfo(number)
      return { number }
    },
  },
  computed: {
    orderName: () => store.state.order.container,
    container: () => store.state.container.data,
    title() {
      return this.$t('containers.header', { number: this.$get('number') })
    },
     // фильтрованные счета, в которых присутствует номер контейнера number
    bills() {
      if ( !this.$get('number') ) { return [] }

      var bills = store.state.bills.data
      var regexp = new RegExp(this.$get('number').trim(), 'i')

      // TODO: remove this to fixtures
      return store.state.auth.login === 'demo'
        ? bills : bills.filter( bill => regexp.test(bill.comment) )
    },
  },
  watch: {
    container() {
      var dates = this.$get('container').map(item => item.date)

      store.actions.getBillList([
        Math.min.apply(Math, dates),
        Math.max.apply(Math, dates)
      ])
    },
  }
}
