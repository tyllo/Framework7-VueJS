import dateMixin from 'mixins/filters/date'
import stockMixin from 'mixins/filters/stock'
import template from './template.jade'

export let name = 'container-item-table'

export default {
  props: [
    'number',
    'type',
    'load',
    'size',
    'date_in',
    'date_out',
    'transport',
    'kontr',
    'konos',
    'sklad_in',
    'sklad_out',
  ],
  mixins: [dateMixin, stockMixin],
  template: template({name}),
}
