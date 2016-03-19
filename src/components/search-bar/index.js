import load from 'promise?global,[name].promise!commons'
import template from './template.jade'
import style from './style.scss'

export let name = 'search-bar'

export default res => load().then( ({ F7 }) => res({
  props: [
    {name: 'placeholder', default: 'Search'},
    {name: 'show', required: true},
    {name: 'event', required: true},
  ],
  data: () => ({
    model: '',
  }),
  template: template({name, style}),
  ready() {
    F7.searchbar(this.$els.form, {})
  },
  methods: {
    hide() {
      this.$set('show', false)
    },
    onSearch() {
      var event = 'search:' + this.$get('event')
      this.$root.$broadcast(event, this.$get('model'))
      this.hide()
    },
  },
}))
