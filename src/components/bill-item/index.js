import formatSumm from 'mixins/filters/formatSumm'
import template from './template.jade'
import style from './style.scss'

export let name = 'bill-item'

export default {
  name,
  props: [
    'date',
    'number',
    'summa',
    'currency',
    'comment',
  ],
  mixins: [formatSumm],
  template: template({name, style}),
  computed: {
    containerNumbers() {
      var pattern = /([A-Z]{4}[0-9]{7}(?![0-9]))/g
      var number = this.$route.params.number
      return this.$get('comment').match(pattern).filter( match => match !== number)
    },
  },
  filters: {
    toBillInfo(number) {
      return {
        name: 'bill/info',
        params: { number },
      }
    },

    toCntInfo(number) {
      return {
        name: 'container/info',
        params: { number },
      }
    },
  },
}
