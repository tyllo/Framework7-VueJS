/**
 * export all action by name
 */

const actions = requireAll(require.context('./modules/', false, /\.js$/))

const {
  changeLang,
  changeOrder,
  clearAuth,
  getAdvance,
  getBillInfo,
  getBillList,
  getCntInfo,
  getCntList,
  getProfile,
  getSettings,
  login,
  logout,
  reLogin,
  setLocal,
  setProgress,
  toggleNotify,
  updateNews,
  updateSettings,
} = actions

export default actions

export {
  changeLang,
  changeOrder,
  clearAuth,
  getAdvance,
  getBillInfo,
  getBillList,
  getCntInfo,
  getCntList,
  getProfile,
  getSettings,
  login,
  logout,
  reLogin,
  setLocal,
  setProgress,
  toggleNotify,
  updateNews,
  updateSettings,
}

/************************************************
                   helpers
===============================================*/

// https://webpack.github.io/docs/context.html#require-context
function requireAll(requireContext) {
  return requireContext.keys().reduce( (actions, file) => {
    return Object.assign(actions, requireContext(file).actions)
  }, {})
}
