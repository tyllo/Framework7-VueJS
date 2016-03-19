/* globals DEBUG */

import { Vue } from 'commons'
import fixtures from 'fixtures/container-list'

var defaultSettings = {
  url: 'api/CntList',
  params: { 'Content-Type': 'application/json' },
}

export default function fetchContainerList(settings = {}) {
  settings = Object.assign(defaultSettings, settings)
  if (DEBUG) { return fixtures() }
  return Vue.http.get(settings).then(parseContainerList)
}

/************************************************
                   helpers
===============================================*/

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
