import template from './template.jade'

export let name = 'page'

export default {
  props: {
    name: { required: true },
    transition: { default: 'page' },
  },
  template: template(),
}
