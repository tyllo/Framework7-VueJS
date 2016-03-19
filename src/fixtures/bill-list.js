import { randomDate, randomNumb, randomChar, ContainerNumb } from './utils'

const CURRENCY = ['РУБ', '$']
const COURSE = 89.12
const COMMENT = `Курс: 78,9969(28.01.2016): ${ContainerNumb()}; ${ContainerNumb()}; ${ContainerNumb()}; ${ContainerNumb()} [Черниковка] | Курс валюты: 78,9969`

/**
 * Операция, произведенная с контейнером
 * @param {unixtime} date — дата выставления счета
 * @param {string} number — номер счета
 * @param {number} summa — сумма счета
 * @param {string} currency — валюта счета
 * @param {string} comment — комментарии к счету
 */
export class Bill {
  constructor() {
    this.date = randomDate()
    this.number = `${randomChar(1)}-${randomNumb(9)}`
    this.currency = CURRENCY[randomNumb() % CURRENCY.length]
    this.summa = this.currency === '$'
      ? (randomNumb(7) / 100 / COURSE).toFixed(2) : randomNumb(7) / 100
    this.comment = COMMENT
  }
}

/**
 * @param {string} message — сообщение с сервера
 * @param <array{Bill}> data — cпискок операций произведенных с указанным контейнером
 */
export default () => new Promise(resolve => resolve({
  message: 'Fixture bill list',
  data: Array.from(Array(2 * randomNumb(1)), () => new Bill()),
}))
