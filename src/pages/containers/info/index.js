import { getCntInfo, getBillList } from 'vuex/actions'
import dateMixin from 'mixins/filters/date'

import template from './template.jade'
import style from './style.scss'

var name = 'container-info'

export default {
  name,
  mixins: [dateMixin],
  template: template({ name, style }),

  data: () => ({
    number: '',
  }),

  route: {
    data() {
      var number = this.$route.params.number.trim()
      this.getCntInfo(number)
      return { number }
    },
  },

  vuex: {
    actions: { getCntInfo, getBillList },

    getters: {
      orderName: state => state.order.container,
      container: state => state.container.data,
      bills: state => state.bills.data,
      login: state => state.auth.login,
    },
  },

  computed: {
     // фильтрованные счета, в которых присутствует номер контейнера number
    billsFiltered() {
      if (!this.$get('number')) { return [] }

      var bills = this.$get('bills').data || []
      var regexp = new RegExp(this.$get('number').trim(), 'i')

      // TODO: remove this to fixtures
      return this.$get('login') === 'demo'
        ? bills : bills.filter( bill => regexp.test(bill.comment) )
    },

    title() {
      return this.$t('containers.header', {
        number: this.$get('number')
      })
    },
  },

  watch: {
    container() {
      var dates = this.$get('container').map(item => item.date)

      if (dates === []) { return }

      this.getBillList([
        Math.min.apply(Math, dates),
        Math.max.apply(Math, dates)
      ])
    },
  }
}
