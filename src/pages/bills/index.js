import store from 'store'
import i18n from './i18n'

var name = 'bills'

store.actions.setLocal({name, i18n})

export default {
  name,
  template: '<router-view></router-view>',
}
