import { fetchFactory, URL, fixtures } from './utils'

var name = 'advance'

export default fetchFactory({
  url: URL[name],
  fixture: fixtures[name],
  parser: parseAdvanceInfo,
})

/**
 * Список платежей
 * @param {unixtime} date — дата платежа
 * @param {number} summa — сумма платежа
 */
export class Advance {
  constructor(data) {
    this.date = data.date * 1000
    this.summa = data.summa
  }
}

/**
 * Список счетов дебетовой задолжности
 * @param {string} number — номер счета
 * @param {unixtime} date — дата счета (дата возникновения задолженности)
 * @param {number} summa — сумма задолженности (может на совпадать со суммой по счету, например счет оплачивался частично, покажет только остаток задолженности по счету)
 */
export class Debt {
  constructor(data) {
    this.number = data.number
    this.date = data.date * 1000
    this.summa = data.summa
  }
}

/**
 * Список авансовых платежей, поступивших от клиента, а также дебиторской задолженности клиента
 * @param {string} message — сообщение с сервера
 * @param {number} summa — текущий баланс
 * @param {number} summa_bill — баланс с учетом выставленных счетов
 * @param <array{Advance}> advance — список платежей
 * @param <array{Debt}> debt — список счетов дебетовой задолжности
 */
export function parseAdvanceInfo({ data }) {
  return {
    message: data.message,
    summa: data.summa,
    summa_bill: data.summa_bill,
    advance: data.tables.advance.map( item => new Advance(item) ),
    debt: data.tables.debt.map( item => new Debt(item) ),
  }
}
