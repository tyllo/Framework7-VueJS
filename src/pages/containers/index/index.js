/* globals DEBUG */

import store from 'store'
import dateMixin from 'mixins/filters/date'
import template from './template.jade'
import style from './style.scss'

var name = 'containers-index'

export default {
  name,
  mixins: [dateMixin],
  template: template({name, style}),
  computed: {
    date_at: () => store.state.containers.date_at,
    date_to: () => store.state.containers.date_to,
    orderName: () => store.state.order.containers,
    containers() {
      var containers = {
        expense: [],
        arrival: [],
      }

      var data = store.state.containers.data || []

      return data.reduce( (containers, container) => {
        if (!container.date_out) {
          containers.arrival.push(container)
        } else {
          containers.expense.push(container)
        }

        return containers
      }, containers)
    },
    isEmptyContainers() {
      var { expense, arrival } = this.$get('containers')
      return !(expense.length || arrival.length) && this.$get('date_at') && this.$get('date_to')
    },
  },
  filters: {
    link({number}) {
      return {
        name: 'container/info',
        params: { number: number }
      }
    },
  },
  events: {
    // search container details
    ['search:containers'](number) {
      this.$route.router.go({
        name: 'container/info',
        params: {number},
      })
    },
    // search containers for date rang
    ['dates:containers']: store.actions.getCntList,
  },
}
