import formatSumm from 'mixins/filters/formatSumm'
import template from './template.jade'

export let name = 'bill-info-item'

export default {
  props: [
    'tovar',
    'count',
    'price',
    'summa',
    'NDS',
    'summands',
  ],
  mixins: [formatSumm],
  template: template({name}),
  computed: {
    title() {
      return this.$t('bills.info.title', {
        summa: this.$get('summands'),
      })
    },

    containers() {
      var pattern = /([A-Z]{4}[0-9]{7}(?![0-9]))/g
      return this.$get('tovar').match(pattern)
    },
  },
  filters: {
    toCntInfo(number) {
      return {
        name: 'container/info',
        params: { number },
      }
    },

    summaTitle(number) {
      return this.$t('containers.header', {number})
    },
  },
}
