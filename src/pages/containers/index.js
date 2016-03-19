import store from 'store'
import i18n from './i18n'

var name = 'containers'

store.actions.setLocal({name, i18n})

export default {
  name: name,
  template: '<router-view></router-view>',
}
