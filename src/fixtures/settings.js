/**
 * Настройки аккаунта
 * @param {number} phone - номер телефона для нотификаций
 * @param {string} email - email для нотификаций
 * @param {string} gravatar_email - email для аватарки с сервиса http://gravatar.com
 * @param {string} gravatar_hash - хеш для сервиса http://gravatar.com
 * @param <Object{boolean}> notifyBy - нотификация о входе в аккаунт
 */
export class Settings {
  constructor() {
    this.email = 'develope@xdraw.ru'
    this.phone = '+7 (123) 456-78-90'
    this.gravatar_email = 'develope@xdraw.ru'
    this.gravatar_hash = '' // '9e61a7147e60351930da8e117a9ccde9'
    this.notifyBy = {
      email: true,
      phone: true,
      gravatar_email: false,
    }
  }
}

/**
 * @return {Settings} — подробная информация о контрагенте
 */
export default () => new Promise( resolve => resolve( new Settings() ))
