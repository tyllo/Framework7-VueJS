/* global Framework7, Dom7 */

import Vue from 'vue'
import i18n from 'vue-i18n'
import Vuex from 'Vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import 'Framework7/dist/js/framework7.js'

import moment from 'moment'
import 'moment/locale/ru'

export {
  Vue,
  i18n,
  Vuex,
  VueRouter,
  VueResource,

  Framework7,
  Dom7,

  moment,
}

export let isIos = Framework7.prototype.device.ios
// export let isAndroid = Framework7.prototype.device.android,
export let isAndroid = !Framework7.prototype.device.ios
export let F7 = {}
