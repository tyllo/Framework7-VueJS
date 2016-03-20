import { fetchFactory, URL, fixtures } from './utils'

var name = 'container-list'

export default fetchFactory({
  url: URL[name],
  fixture: fixtures[name],
  parser: parseContainerList,
})

/**
 * Свойство контейнера
 * @param {string} number — номер контейнера
 * @param {unixtime} date_in — дата поступления (прихода) контейнера
 * @param {unixtime} date_out — дата убытия (расхода) контейнера
 * @param {string} type — тип контейнера
 * @param {number} size — размер контейнера
 * @param {boolean} load — загрузка контейнера
 * @param {string} transport — название транспорта, с которым прибыл (убыл) контейнер
 * @param {string} kontr — наименование контрагента
 * @param {string} konos — номер коносамента
 * @param {string} sklad_in — склад поступления (прихода) контейнера
 * @param {string} sklad_out — склад убытия (расхода) контейнера
 */
export class Container {
  constructor(data) {
    this.number = data.number
    this.date_in = data.date_in * 1000
    this.date_out = data.date_out * 1000
    this.type = data.type.id
    this.size = data.size.id
    this.load = data.load.id ? 'true' : 'false'
    this.transport = data.transport
    this.kontr = data.kontr
    this.konos = data.konos
    this.sklad_in = data.sklad_in
    this.sklad_out = data.sklad_out
  }
}

/**
 * @param {string} message — сообщение с сервера
 * @param <array{ContainerInfo}> data - подробные свойства контейнера
 */
function parseContainerList({ data }) {
  return {
    message: data.message,
    data: data.table.map( item => new Container(item) ),
  }
}
