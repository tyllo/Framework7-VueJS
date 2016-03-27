import { getCntList } from 'vuex/actions'
import dateMixin from 'mixins/filters/date'

import template from './template.jade'
import style from './style.scss'

var name = 'containers-index'

export default {
  name,
  mixins: [dateMixin],
  template: template({name, style}),

  vuex: {
    actions: { getCntList },

    getters: {
      date_at: state => state.containers.date_at,
      date_to: state => state.containers.date_to,
      orderName: state => state.order.containers,
      containers: state => {
        var data = state.containers.data || []
        var containers = {
          expense: [],
          arrival: [],
        }

        return data.reduce( (containers, container) => {
          if (!container.date_out) {
            containers.arrival.push(container)
          } else {
            containers.expense.push(container)
          }

          return containers
        }, containers)
      },
    },
  },

  computed: {
    isEmptyContainers() {
      var { expense, arrival } = this.$get('containers')
      return !(expense.length || arrival.length) && this.$get('date_at') && this.$get('date_to')
    },
  },

  methods: {
    linkToContainer({number}) {
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
        params: { number },
      })
    },

    // search containers for date rang
    ['dates:containers'](dates) {
      this.getCntList(dates)
    },
  },
}
