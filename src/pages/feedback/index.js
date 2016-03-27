import { F7, isAndroid } from 'commons'

import template from './template.jade'

var name = 'feedback'

export default {
  name,
  template: template({name}),

  data: () => ({
    textarea: '',
    isAndroid,
  }),

  methods: {
    onSubmit() {
      var textarea = this.$get('textarea')
      this.$nextTick( () =>
        F7.alert(textarea, 'Форма обратной связи')
      )
      this.$set('textarea', null)
    },
  },
}
