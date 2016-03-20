/**
 * cache list (bills or containers) by [dates]
 * @param {String} name — имя кеша
 * @param {BillList | ContainerList} _last — закешированный последний запрос
 * @param <Array{BillList | ContainerList}> _data — кеш списка счетов или контейнеров
 */
export default class CacheList {
  constructor(name) {
    this.name = name
    this._data = []
    this._last = {}
  }

  set({ date_at, date_to, data }) {
    this._data.push({ date_at, date_to, data })
  }

  get({ date_at, date_to }) {
    return this.isIn({ date_at, date_to }) ? {
      date_at, date_to,
      data: this.isIn({ date_at, date_to }),
      message: `Get ${ this.name } ${ date_at }, ${ date_to } from cache`,
    } : null
  }

  isIn({ date_at, date_to }) {

    if ((this._last.date_at === date_at) && (this._last.date_at === date_at)) {
      return this._last.data
    }

    var data = this._data.find( item => {
      return (item.date_at === date_at) && (item.date_to === date_to)
    })

    // cached last item for fast find
    // TODO: date_request
    this._last = { date_at, date_to, data }

    return data
  }
}
