import template from './template.jade'
import partial from 'partials/item-content.jade'

export let name = 'item-content-accordion'

export default {
  name,
  props: [
    'icon',
    'title',
    'after',
    'subtitle',
    'text',
  ],
  template: template(),
  partials: { partial: partial() },
}
