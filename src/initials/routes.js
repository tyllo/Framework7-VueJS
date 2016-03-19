import mixin from 'mixins/global'

import About from 'pages/about'

import Advance from 'pages/advance'

import Contacts from 'pages/contacts'

import Feedback from 'pages/feedback'
import Login from 'pages/login'
import Logout from 'pages/logout'

import News from 'pages/news'
import NewsIndex from 'pages/news/index/'
import NewsItem from 'pages/news/item'

import Profile from 'pages/profile'
import ProfileIndex from 'pages/profile/index/'
import ProfileEdit from 'pages/profile/edit'

import Settings from 'pages/settings'
import SettingsIndex from 'pages/settings/index/'
import SettingsEdit from 'pages/settings/edit'

import Tabs from 'pages/tabs-swipeable'

import Containers from 'pages/containers/'
import ContainerInfo from 'pages/containers/info/'

import Bills from 'pages/bills/'
import BillInfo from 'pages/bills/info/'

import Index from 'pages/index'

import notFound from 'pages/404'

[
  About,
  Advance,
  Contacts,
  Feedback,
  Login,
  Logout,

  News,
  NewsIndex,
  NewsItem,

  Profile,
  ProfileIndex,
  ProfileEdit,

  Settings,
  SettingsIndex,
  SettingsEdit,

  Tabs,

  Containers,
  ContainerInfo,

  Bills,
  BillInfo,

  Index,
  notFound
].map( page => {
  var {mixins = []} = page
  mixins.push(mixin)
  page.mixins = mixins
})

export default {
  '*': {
    component: notFound,
    name: name(notFound),
    panel: 'left',
  },

  index: {
    component: Index,
    name: name(Index),
    panel: false,
  },

  about: {
    component: About,
    name: name(About),
    panel: 'left',
  },

  contacts: {
    component: Contacts,
    name: name(Contacts),
    panel: 'left',
  },

  feedback: {
    component: Feedback,
    name: name(Feedback),
    panel: 'left',
  },

  login: {
    component: Login,
    name: name(Login),
    panel: false,
  },

  logout: {
    component: Logout,
    name: name(Logout),
    panel: 'left',
  },

  news: {
    component: News,
    name: name(News),
    panel: 'left',
    subRoutes: {
      '/': {
        component: NewsIndex,
        name: name(NewsIndex),
      },
      ':id': {
        component: NewsItem,
        name: name(NewsItem),
      },
    },
  },

  profile: {
    component: Profile,
    name: name(Profile),
    panel: 'left',
    subRoutes: {
      '/': {
        component: ProfileIndex,
        name: name(ProfileIndex),
      },
      'edit': {
        component: ProfileEdit,
        name: name(ProfileEdit),
      },
    },
  },

  settings: {
    component: Settings,
    name: name(Settings),
    panel: 'left',
    subRoutes: {
      '/': {
        component: SettingsIndex,
        name: name(SettingsIndex),
      },
      'edit': {
        component: SettingsEdit,
        name: name(SettingsEdit),
      },
    },
  },

  'tabs/:tab': {
    component: Tabs,
    name: name(Tabs),
    panel: 'left',
  },

/*
  containers: {
    component: Advance,
    name: name(Advance),
    panel: 'left',
  },

  containers: {
    component: Advance,
    name: name(Advance),
    panel: 'left',
  },

  bills: {
    component: Bills,
    name: name(Bills),
    panel: 'left',
  },
*/

  'container/:number': {
    component: ContainerInfo,
    name: name(ContainerInfo),
    panel: 'left',
  },

  'bill/:number': {
    component: BillInfo,
    name: name(BillInfo),
    panel: 'left',
  },
}

// convert foo-bar to foo/bar
function name(component) {
  return component.name.replace(/-/g, '/')
}
