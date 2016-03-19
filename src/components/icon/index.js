import load from 'promise?global,[name].promise!icons'
import template from './template.jade'
import style from './style.scss'

export let name = 'icon'

export default res => load().then( ({ default: icons }) => res({
  props: {
    id: {
      required: true,
      coerce: id => icons[id],
    },
    class: { default: '' },
    style: { default: '' },
    height: { default: 24 },
    width: { default: 24 },
  },
  name: name,
  template: template({style}),
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
  },
}))
