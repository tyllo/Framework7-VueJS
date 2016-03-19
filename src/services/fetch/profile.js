/* globals DEBUG */

import { Vue } from 'commons'
import fixtures from 'fixtures/profile'

var defaultSettings = {
  url: 'api/KontrInfo',
  params: { 'Content-Type': 'application/json' },
}

export default function fetchProfile(settings = {}) {
  settings = Object.assign(defaultSettings, settings)
  if (DEBUG) { return fixtures() }
  return Vue.http.get(settings).then(parseProfile)
}

/************************************************
                   helpers
===============================================*/

/**
 * Подробная информация о контрагенте
 * @param {string} name — наименование контрагента
 * @param {string} full_name — полное наименование контрагента
 * @param {string} INN — ИНН контрагента
 * @param {string} KPP — КПП контрагента
 * @param {string} OKPO — ОКПО контрагента
 * @param {string} Jur_address — юридический адрес контрагента
 * @param {string} Fact_address — фактический адрес контрагента
 * @param {string} Phone — телефоны контрагента
 * @param {string} bank_account — номер расчетного счета контрагента
 * @param {string} corr_account — номер корр счета
 * @param {string} Bank_name — наименование банка в котором открыт счет
 * @param {string} BIK — БИК банка
 * @param {string} Bank_address — адрес банка
 */
export class Profile {
  constructor(data) {
    this.name = data.name
    this.full_name = data.full_name
    this.INN = data.INN
    this.KPP = data.KPP
    this.OKPO = data.OKPO
    this.Jur_address = data.Jur_adress
    this.Fact_address = data.Fact_adress
    this.Phone = data.Phone
    this.bank_account = data.bank_account
    this.corr_account = data.corr_account
    this.Bank_name = data.Bank_name
    this.BIK = data.BIK
    this.Bank_address = data.Bank_adress
  }
}

/**
 * @param {string} message — сообщение
 * @param {Profile} data — подробная информация о контрагенте
 */
function parseProfile({ data }) {
  return {
    message: data.message,
    data: new Profile(data.table.tbody),
  }
}
