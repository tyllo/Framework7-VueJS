/* global NODE_ENV, DEBUG */

import { F7, Framework7, Dom7, isIos, isAndroid } from 'commons'

var platform = isIos ? 'ios' : 'android'

Object.assign(F7, new Framework7({
  modalTitle: '',
  material: isAndroid,
  // pushState: true,
  // hideTabbarOnPageScroll: true,
  animateNavBackIcon: isIos,
  swipePanel: 'left',
  swipePanelActiveArea: '20',
  // router: false,
  init: false,
}))

// http://goo.gl/0VB8sl

// if (NODE_ENV === 'production') {
//   Dom7('head').append(`<link rel="stylesheet" href="assets/styles/${platform}.css">`)
// }

DEBUG && console.log(`Platform is <${platform}>`)
