import { fetchFactory, URL, fixtures } from './utils'

var name = 'settings'

export default fetchFactory({
  url: URL[name],
  fixture: fixtures[name],
  parser: parseSettings,
})

/**
 * Настройки аккаунта
 * @param {number} phone — номер телефона для нотификаций
 * @param {string} email — email для нотификаций
 * @param {string} gravatar_email — email для аватарки с сервиса http://gravatar.com
 * @param {string} gravatar_hash — хеш для аватарки с сервиса http://gravatar.com
 * @param <Object{boolean}> notifyBy — нотификация о входе в аккаунт
 */
export class Settings {
  constructor(data) {
    this.phone = data.phone
    this.email = data.email
    this.gravatar_email = data.gravator_email
    this.gravatar_hash = data.gravator_hash

    // TODO: notifyBy on server side
    this.notifyBy = {
      email: false,
      phone: false,
      gravatar_email: false,
    }
  }
}

/**
 * @param {string} message — сообщение
 * @param {Settings} data — настройки аккаунта
 */
function parseSettings({ data }) {
  return new Settings(data)
}
