import template from './template.jade'

export let name = 'operation-item'

export default {
  props: [
    { name: 'operation', required: true },
    { name: 'date', required: true },
    'transport',
    'kontr',
  ],
  template: template(),
  computed: {
    title() {
      return this.$t(`containers.operations['${this.$get('operation')}']`)
    },
  },
}
