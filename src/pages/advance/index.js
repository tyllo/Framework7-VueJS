import formatSumm from 'mixins/filters/formatSumm'
import dateMixin from 'mixins/filters/date'
import template from './template.jade'

var name = 'advance'

export default {
  name,
  mixins: [dateMixin, formatSumm],
  template: template(),

  vuex: {
    getters: {
      advance: state => state.advance.advance || [],
      debt: state => state.advance.debt || [],
      summa: state => state.advance.summa,
      summa_bill: state => state.advance.summa_bill,
      orderName: state => state.order.advance,
    },
  },

  methods: {
    linkToBillInfo: number => ({
      name: 'bill/info',
      params: { number },
    }),
  },

  filters: {
    toSummaTitle(summa = 0) {
      return this.$t('advance.advanceTitle', { summa })
    },

    toDateTo(date) {
      return this.$t('bills.subtitle', { date })
    },
  },
}
