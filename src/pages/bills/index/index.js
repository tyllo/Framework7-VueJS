import { getBillList } from 'vuex/actions'
import dateMixin from 'mixins/filters/date'

import template from './template.jade'
import style from './style.scss'

var name = 'bills-index'

export default {
  name,
  mixins: [dateMixin],
  template: template({name, style}),

  vuex: {
    actions: { getBillList },

    getters: {
      orderName: state => state.order.bills,
      date_at: state => state.bills.date_at,
      date_to: state => state.bills.date_to,
      bills: state => state.bills.data || [],
    },
  },

  events: {
    // search bill for number
    ['search:bills'](number) {
      this.$router.go({
        name: 'bill/info',
        params: { number },
      })
    },

    // search bills for date rang
    ['dates:bills'](dates) {
      this.getBillList(dates)
    },
  },
}
