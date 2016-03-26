/* globals DEBUG */

import store from 'store'
import dateMixin from 'mixins/filters/date'
import template from './template.jade'
import style from './style.scss'

var name = 'bills-index'

export default {
  name,
  mixins: [dateMixin],
  template: template({name, style}),
  computed: {
    orderName: () => store.state.order.bills,
    date_at: () => store.state.bills.date_at,
    date_to: () => store.state.bills.date_to,
    bills: () => store.state.bills.data || [],
  },
  events: {
    // search bill for number
    ['search:bills'](number) {
      this.$route.router.go({
        name: 'bill/info',
        params: {number},
      })
    },
    // search bills for date rang
    ['dates:bills']: store.actions.getBillList,
  },
}
