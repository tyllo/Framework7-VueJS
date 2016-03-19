/* globals DEBUG */

import { Vue } from 'commons'
import fixtures from 'fixtures/container-info'

var defaultSettings = {
  url: 'api/CntInfo',
  params: { 'Content-Type': 'application/json' },
}

export default function fetchContainerInfo(settings = {}) {
  settings = Object.assign(defaultSettings, settings)
  if (DEBUG) { return fixtures() }
  return Vue.http.get(settings).then(parseContainerInfo)
}

/************************************************
                   helpers
===============================================*/

/**
 * Таблица сопоставляет операции с именем иконки операции
 */
const OPERATIONS = {
  'Взвешивание': 'weighing',
  'Выставление': 'nomination',
  'Дезинфекция': 'disinfection',
  'Досмотр': 'inspection',
  'Затарка': 'stuffing',
  'Крепление обрусовка': 'lathing',
  'МИДК': 'MIDK',
  'Отключение': 'disconnection',
  'Передача контейнеров': 'delivery',
  'Пломбирование': 'seal',
  'Подключение': 'connection',
  'Приход': 'arrival',
  'Промывка': 'washing',
  'Растарка': 'unstuffing',
  'Расход': 'expense',
  'Снабжение': 'supply',
}

/**
 * Подробное свойство контейнера
 * @param {unixtime} date — дата совершения операции
 * @param {string} oper — наименование операции
 * @param {string} transport — название транспорта, с которым прибыл (убыл) контейнер
 * @param {string} kontr — наименование контрагента

 * @param {string} number — номер контейнера
 * @param {string} type — тип контейнера
 * @param {string} size — размер контейнера
 * @param {boolean} load — загрузка контейнера
 */
export class ContainerInfo {
  constructor(data) {

    this.date = data.date * 1000
    this.operation = OPERATIONS[data.oper]
    this.transport = data.transport
    this.kontr = data.kontr

    // this.number = data.number
    // this.type = data.type.id
    // this.size = data.size.id
    // this.load = data.load.id ? 1 : 0
  }
}

/**
 * @param {string} message — сообщение с сервера
 * @param <array{ContainerInfo}> data - подробные свойства контейнера
 */
function parseContainerInfo({ data }) {
  return {
    message: data.message,
    data: data.table.map( item => new ContainerInfo(item) ),
  }
}
