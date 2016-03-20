import store from 'store'
import i18n from './i18n'
import dateMixin from 'mixins/filters/date'
import template from './template.jade'

var name = 'advance'

store.actions.setLocal({name, i18n})

export default {
  name,
  mixins: [dateMixin],
  template: template(),
  computed: {
    advance: () => store.state.advance.advance,
    debt: () => store.state.advance.debt,
    summa: () => store.state.advance.summa,
    summa_bill: () => store.state.advance.summa_bill,
    orderName: () => store.state.order.advance,
  },
  filters: {
    summaTitle(summa = 0) {
      return this.$t('advance.advanceTitle', {summa})
    },
    toBillInfo(number) {
      return {
        name: 'bill/info',
        params: { number },
      }
    },
    dateTo(date) {
      return this.$t('bills.subtitle', {date})
    },
  }
}
