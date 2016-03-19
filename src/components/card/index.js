import template from './template.jade'

export let name = 'card'

export default {
  props: [
    'header',
    'content',
    'footer',
  ],
  template: template(),
}
