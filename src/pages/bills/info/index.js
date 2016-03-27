import { getBillInfo } from 'vuex/actions'
import formatSumm from 'mixins/filters/formatSumm'

import template from './template.jade'
import style from './style.scss'

var name = 'bill-info'

export default {
  name,
  mixins: [formatSumm],
  template: template({name, style}),

  data: () => ({
    number: '',
  }),

  route: {
    data() {
      var number = this.$route.params.number.trim()
      this.getBillInfo(number)
      return { number }
    },
  },

  vuex: {
    actions: { getBillInfo },

    getters: {
      orderName: state => state.order.bill,
      bill: state => state.bill.data || [],
      total: state => state.bill.data.reduce( (total, item) => {
        return +total + +item.summands
      }, 0).toFixed(2),
    },
  },

  computed: {
    title() {
      return this.$t('bills.header', {
        number: this.$get('number')
      })
    },
  },
}
