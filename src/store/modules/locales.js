import { moment } from 'commons'
import Storage from 'services/Storage'
import { SET_LOCAL, CHANGE_LOCAL } from 'store/mutation-types'

export let name = 'locales'

const defaults = {
  lang: 'en',
  langs: [
    { key: 'en', value: 'English' },
    { key: 'ru', value: 'Русский' },
  ],
  current: {},
  en: {},
  ru: {},
}

// initial state
export const state = Storage.get(name, defaults)

// initial local
moment.locale(state.lang)

// mutations
export const mutations = {
  [SET_LOCAL]({ locales }, local) {
    var lang = locales.lang
    locales.en[local.name] = local.i18n.en
    locales.ru[local.name] = local.i18n.ru
    locales.current = locales[lang]
  },

  [CHANGE_LOCAL]({ locales }, lang) {
    locales.lang = lang
    locales.current = locales[lang]
    Storage.set(name, locales)
  },
}

// actions
export const actions = {
  setLocal({ dispatch }, local) {
    dispatch(SET_LOCAL, local)
  },

  changeLang({ dispatch }, lang) {
    moment.locale(lang)
    dispatch(CHANGE_LOCAL, lang)
  },
}
