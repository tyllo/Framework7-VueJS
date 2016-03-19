import formatSumm from 'mixins/filters/formatSumm'
import template from './template.jade'

export let name = 'bill-info-item-table'

export default {
  name,
  props: [
    'count',
    'price',
    'summa',
    'NDS',
    'summands',
  ],
  mixins: [formatSumm],
  template: template({name}),
}
