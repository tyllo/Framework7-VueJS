import { logout } from 'vuex/actions'

var name = 'logout'

export default {
  name,

  route: {
    activate({ redirect }) {
      this.logout()
      redirect({name: 'index'})
    },
  },

  vuex: {
    actions: { logout },
  },
}
