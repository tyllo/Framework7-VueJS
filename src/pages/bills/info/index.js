import store from 'store'
import formatSumm from 'mixins/filters/formatSumm'
import template from './template.jade'
import style from './style.scss'

var name = 'bill-info'

export default {
  name,
  template: template({name, style}),
  data: () => ({
    number: '',
  }),
  mixins: [formatSumm],
  route: {
    data() {
      var number = this.$route.params.number
      store.actions.getBillInfo(number)
      return { number }
    },
  },
  computed: {
    orderName: () => store.state.order.bill,
    bill: () => store.state.bill.data,
    title() {
      return this.$t('bills.header', {number: this.$get('number')})
    },
    total() {
      return this.$t('bills.total', {
        total: this.$get('bill').reduce( (total, item) => {
          return +total + +item.summands
        }, 0).toFixed(2)
      })
    },
  }
}
