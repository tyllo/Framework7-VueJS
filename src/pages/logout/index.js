import store from 'store'
import i18n from './i18n'

var name = 'logout'

store.actions.setLocal({name, i18n})

export default {
  name,
  route: {
    activate({redirect}) {
      store.actions.logout()
      redirect({name: 'index'})
    },
  }
}
