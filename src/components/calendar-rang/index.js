// import { F7 } from 'commons'
import load from 'promise?global,[name].promise!commons'
import template from './template.jade'

export let name = 'calendar-rang'

export default res => load().then( ({ F7 }) => res({
  props: [
    {name: 'show', required: true},
    {name: 'event', required: true},
  ],
  template: template(),
  ready() {
    var calendar = F7.calendar({
      onlyOnPopover: true,
      input: this.$els.calendar,
      dateFormat: 'dd M yyyy',
      rangePicker: true,
      onClose: this.onClose,
      disabled: {
        from: new Date()
      },
    })
    setTimeout(calendar.open, 10)
  },
  methods: {
    onClose(calendar) {
      var event = 'dates:' + this.$get('event')
      this.$root.$broadcast(event, calendar.value)
      this.$set('show', false)
    },
  }
}))
