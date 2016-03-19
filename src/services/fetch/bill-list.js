/* globals DEBUG */

import { Vue } from 'commons'
import fixtures from 'fixtures/bill-list'

var defaultSettings = {
  url: 'api/BillList',
  params: { 'Content-Type': 'application/json' },
}

export default function fetchBillList(settings = {}) {
  settings = Object.assign(defaultSettings, settings)
  if (DEBUG) { return fixtures() }
  return Vue.http.get(settings).then(parseBillList)
}

/************************************************
                   helpers
===============================================*/

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
function parseBillList({ data }) {
  return {
    message: data.message,
    data: data.table.map( item => new Bill(item) ),
  }
}
