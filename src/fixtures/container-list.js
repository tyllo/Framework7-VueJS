import { randomDate, randomNumb, randomChar, ContainerNumb } from './utils'
import load from 'promise?global,[name].promise!icons'

var TYPES
const SIZES = [ 3, 5, 10, 20, 40, 45 ]
const STOCK = ['ПИК', 'ВМКТ']
const KONTR = 'ООО МАЭРСК'

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
  constructor() {
    this.number = ContainerNumb()
    this.date_in = randomDate()
    this.date_out = Math.random() >= 0.5
      ? randomDate(this.date_in) : 0
    this.type = TYPES[randomNumb() % TYPES.length]
    this.size = SIZES[randomNumb() % SIZES.length]
    this.load = Math.random() >= 0.5
    this.transport = randomChar(8)
    this.kontr = KONTR
    this.konos = randomChar(5) + randomNumb(9)
    this.sklad_in = STOCK[randomNumb() % STOCK.length]
    this.sklad_out = STOCK[randomNumb() % STOCK.length]
  }
}

/**
 * @param {string} message — сообщение с сервера
 * @param <array{Container}> data — свойства контейнера
 */
export default () => load().then( ({ containers }) => {
  TYPES = Object.keys(containers)
  return {
    message: 'Fixture container list',
    data: Array.from(Array(randomNumb(2)), () => new Container()),
  }
})
