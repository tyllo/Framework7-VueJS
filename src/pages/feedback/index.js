import { F7, isAndroid } from 'commons'
import store from 'store'
import i18n from './i18n'
import template from './template.jade'

var name = 'feedback'

store.actions.setLocal({name, i18n})

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
