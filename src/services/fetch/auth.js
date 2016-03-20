import { fetchFactory, URL, fixtures } from './utils'

export let login = fetchFactory({
  url: URL.login,
  parser: ({ data }) => data,
  fixture: fixtures.auth.login,
})

export let logout = fetchFactory({
  url: URL.logout,
  parser: ({ data }) => data,
  fixture: fixtures.auth.logout,
})

export default { login, logout }
