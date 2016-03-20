/**
 * cache item (bill or container) by number
 * @param {String} name — имя кеша
 * @param <Object{BillInfo | ContainerInfo}> _data — кеш счетов или контейнеров
 */
export default class CacheItem {
  constructor(name) {
    this.name = name
    this._data = {}
  }

  set(number, data) {
    this._data[number] = data
  }

  get(number) {
    return this._data[number] ? {
      number,
      data: this._data[number],
      message: `Get ${ this.name } ${ number } from cache`,
    } : null
  }
}
