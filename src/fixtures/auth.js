import { randomDate, randomNumb, randomChar } from './utils'

export default { login, logout }

/**
 * @param {string} secret — ключ для идентификатора сессии
 * @param {string} message — сообщение
 * @param {boolean} ready_check, истина — авторизация пройдена
 * @param {string} login — логин (учетное имя) пользователя
 * @param {dateTime} create_at — дата и время создания сессии
 * @param {boolean} check_cnt, истина — пользователь имеет доступ к информации о контейнерах
 * @param {boolean} check_doc, истина — пользователь имеет доступ к информации о финансовых документах
 * @param {boolean} check_zayv, истина — пользователь имеет доступ к информации о заявках
 * @param {string} name_expeditor — название контрагента (экспедитора), присвоенного пользователю
 */
export function login() {
  return new Promise( resolve => resolve({
    secret: randomChar(30),
    message: 'Авторизация пройдена',
    ready_check: randomNumb % 2,
    create_at: randomDate(),
    login: 'demo',
    check_cnt: randomNumb() % 2,
    check_doc: randomNumb() % 2,
    check_zayav: randomNumb() % 2,
    name_expeditor: 'Demo name',
  }))
}

/**
 * @param {string} message — сообщение
 */
export function logout() {
  return new Promise( resolve => resolve({
    message: 'Успешно разлогинелись',
  }))
}
