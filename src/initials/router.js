import { Vue, VueRouter } from 'commons'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  root: '',
  linkActiveClass: 'active',
  hashbang: true,
  // history: true,
  // saveScrollPosition: true,
})

router.map(routes)

router.alias({
  '/': 'index',
})

export default router
