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
    // TODO - for remove 'component is instance'
    'class',
    'href',
  ],
  template: template(),
  partials: { partial: partial() },
}
