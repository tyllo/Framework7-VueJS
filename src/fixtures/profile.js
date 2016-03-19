import { randomNumb } from './utils'

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
  constructor() {
    this.name = 'Рога и копыто ООО'
    this.full_name = 'ООО "Черноморское отделение Арбатовской конторы по заготовке рогов и копыт"'
    this.INN = randomNumb(9)
    this.KPP = randomNumb(8)
    this.OKPO = randomNumb(8)
    this.Jur_address = `${randomNumb(6)}, г. Черноморск, Незабываемая ул., д.${randomNumb(2)}`
    this.Fact_address = `${randomNumb(6)}, г. Черноморск, Незабываемая ул, д.${randomNumb(8)}`
    this.Phone = `${randomNumb(3)}-${randomNumb(2)}-${randomNumb(2)}, ${randomNumb(11)}`
    this.bank_account = randomNumb(20)
    this.corr_account = randomNumb(20)
    this.Bank_name = '"Bank of Switzerland"'
    this.BIK = randomNumb(9)
    this.Bank_address = 'Цветочная ул.'
  }
}

/**
 * @param {string} message — сообщение
 * @param {Profile} data — подробная информация о контрагенте
 */
export default () => new Promise( resolve => resolve({
  message: 'Fixture profile',
  data: new Profile(),
}))
