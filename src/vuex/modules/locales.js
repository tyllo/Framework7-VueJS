import { moment } from 'commons'
import Storage from 'services/Storage'
import { CHANGE_LOCAL } from '../mutation-types'

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

// parse all i18n from page/ to default
requireAll(require.context('pages/', true, /i18n\.js$/))

// initial state
export const state = Storage.get(name, defaults)

state.current = defaults[state.lang]

// initial local
moment.locale(state.lang)

// mutations
export const mutations = {
  [CHANGE_LOCAL](state, lang) {
    state.lang = lang
    state.current = state[lang]
    Storage.set(name, state)
  },
}

// actions
export const actions = {
  changeLang({ dispatch }, lang) {
    moment.locale(lang)
    dispatch(CHANGE_LOCAL, lang)
  },
}

/************************************************
                   helpers
===============================================*/

// https://webpack.github.io/docs/context.html#require-context
function requireAll(requireContext) {
  return requireContext.keys().reduce( (locals, file) => {
    var local = requireContext(file).default
    var name = file.match(/\.\/(.+?)\/i18n\.js/)[1]

    locals.en[name] = local.en
    locals.ru[name] = local.ru

    return locals
  }, defaults)
}
