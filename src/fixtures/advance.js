import { randomDate, randomChar, randomNumb } from './utils'

/**
 * Информация о платеже
 * @param {unixtime} date: истина — дата платежа
 * @param {number} summa — сумма платежа
 */
class Advance {
  constructor() {
    this.date = randomDate()
    this.summa = randomNumb(7) / 100
  }
}

/**
 * Счет дебетовой задолжности
 * @param {number} summa — сумма задолженности (может на совпадать со суммой по счету, например счет оплачивался частично, покажет только остаток задолженности по счету)
 * @param {string} number — номер счета
 * @param {unixtime} date — дата счета (дата возникновения задолженности)
 */
class Debt {
  constructor() {
    this.number = `${randomChar(1)}-${randomNumb(9)}`
    this.date = randomDate()
    this.summa = randomNumb(7) / 100
  }
}

/**
 * @param {string} message — сообщение с сервера
 * @param {number} summa — текущий баланс
 * @param {number} summa_bill — баланс с учетом выставленных счетов
 * @param <array{Advance}> advance — список платежей
 * @param <array{Debt}> debt — список счетов дебетовой задолжности
 */
export default () => new Promise( resolve => resolve({
  message: 'Fixture advance info',
  summa: randomNumb(7) / 100,
  summa_bill: randomNumb(7) / 100,
  advance: Array.from(Array(2 * randomNumb(1)), () => new Advance()),
  debt: Array.from(Array(2 * randomNumb(1)), () => new Debt()),
}))
