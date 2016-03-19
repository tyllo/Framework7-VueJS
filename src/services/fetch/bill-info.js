/* globals DEBUG */

import { Vue } from 'commons'
import fixtures from 'fixtures/bill-info'

var defaultSettings = {
  url: 'api/BillInfo',
  params: { 'Content-Type': 'application/json' },
}

export default function fetchBillInfo(settings = {}) {
  settings = Object.assign(defaultSettings, settings)
  if (DEBUG) { return fixtures() }
  return Vue.http.get(settings).then(parseBillInfo)
}

/************************************************
                   helpers
===============================================*/

/**
 *  Список товаров и услуг, включенных в указанный счет.
 *  @param {string} tovar — наименование товара или услуги
 *  @param {number} count — количество товаров или услуг
 *  @param {number} price — цена за единицу товара или услуги
 *  @param {number} summa — сумма по строке
 *  @param {number} NDS — сумма НДС по строке
 *  @param {number} summands — сумма с НДС по строке
 */
export class BillInfo {
  constructor(data) {
    this.tovar = data.tovar
    this.count = data.count
    this.price = data.price
    this.summa = data.summa
    this.NDS = data.NDS
    this.summands = data.summaNDS
  }
}

/**
 * Подробная информация о счете
 * @param {string} message — сообщение с сервера
 * @param {BillInfo} debt — список товаров и услуг, включенных в указанный счет
 */
function parseBillInfo({ data }) {
  return {
    message: data.message,
    data: data.table.map( item => new BillInfo(item) ),
  }
}
