import { fetchFactory, URL, fixtures } from './utils'

var name = 'bill-list'

export default fetchFactory({
  url: URL[name],
  fixture: fixtures[name],
  parser: parseBillList,
})

/**
 * Операция, произведенная с контейнером
 * @param {unixtime} date — дата выставления счета
 * @param {string} number — номер счета
 * @param {number} summa — сумма счета
 * @param {string} currency — валюта счета
 * @param {string} comment — комментарии к счету
 */
export class Bill {
  constructor(data) {
    this.date = data.date * 1000
    this.number = data.number
    this.summa = data.summa
    this.currency = data.currency
    this.comment = data.comment
  }
}

/**
 * @param {string} message — сообщение с сервера
 * @param <array{Bill}> — cпискок операций произведенных с указанным контейнером
 */
export function parseBillList({ data }) {
  return {
    message: data.message,
    data: data.table.map( item => new Bill(item) ),
  }
}
