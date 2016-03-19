import { randomNumb, randomDate, randomChar } from './utils'
import load from 'promise?global,[name].promise!icons'

var OPERATIONS
const EXPAND = ['arrival', 'expense']
const KONTR = 'Demo kontragent'

/**
 * Операция с контейнером
 * @param {string} operation — тип операции
 * @param {unixtime} date — дата операции
 * @param {string} transport — название транспорта, с которым прибыл (убыл) контейнер
 * @param {string} kontr — наименование контрагента
 */
export class ContainerInfo {
  constructor() {
    this.operation = OPERATIONS[randomNumb(5) % OPERATIONS.length]
    this.date = randomDate()

    if ( EXPAND.some( type => type === this.type ) ) {
      this.transport = randomChar(8)
      this.kontr = KONTR
    }
  }
}

/**
 * @param {string} message — сообщение с сервера
 * @param <array{ContainerInfo}> data - операции над контейнером
 */
export default () => load().then( ({ operations }) => {
  OPERATIONS = Object.keys(operations)
  return {
    message: 'Fixture container info',
    data: Array.from(Array(2 * randomNumb(1)), () => new ContainerInfo()),
  }
})
