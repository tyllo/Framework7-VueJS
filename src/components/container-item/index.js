import template from './template.jade'
import style from './style.scss'

export let name = 'container-item'

export default {
  props: [
    { name: 'title', required: true },
    { name: 'type', required: true },
    'text',
    'size',
    'load',
  ],
  template: template({name, style}),
  filters: {
    parseSize(size) {
      return this.$t(`containers.sizes[${size}]`)
    },
  },
}
