import { Vue } from 'commons'

var components = requireAll(require.context('components/', true, /index\.js$/))

components.map( ({ name, default: component }) => {
  Vue.component(name, component)
})

// https://webpack.github.io/docs/context.html#require-context
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext)
}
