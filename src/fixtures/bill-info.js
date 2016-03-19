import { ContainerNumb, randomNumb } from './utils'

const TOVAR = [
  `Выставление контейнера на обследование МИДК | Курс: 78,6805(10.02.2016) [MLVLV575946220]: ${ContainerNumb()}; ${ContainerNumb()} [Екатеринбург -Товарный; Москва-Ховрино]`,
  `Выставление контейнера на обследование МИДК | Курс: 78,6805(10.02.2016) [MLVLV575943220]: ${ContainerNumb()} [Москва - Бутырская]`,
  `Выставление контейнера на обследование МИДК | Курс: 78,6805(10.02.2016) [MLVLVMCC994316]: ${ContainerNumb()} [Москва - Бутырская]`,
]

/**
 * Товар или услуга, включеннаях в указанный счет
 * @param {string} tovar — наименование товара или услуги
 * @param {number} count — количество товаров или услуг
 * @param {number} price — цена за единицу товара или услуги
 * @param {number} summa — сумма по строке
 * @param {number} NDS — сумма НДС по строке
 * @param {number} summands — сумма с НДС по строке
 */
export class BillInfo {
  constructor() {
    this.tovar = TOVAR[randomNumb(5) % TOVAR.length]
    this.count = randomNumb(1) % 10 + 1
    this.price = randomNumb(7) / 100
    this.summa = (this.count * +this.price).toFixed(2)
    this.NDS = (Math.random() >= 2 / 3)
      ? (+(+this.summa / 0.18)).toFixed(2) : 0
    this.summands = (+this.summa + +this.NDS).toFixed(2)
  }
}

/**
 * @param {string} message — сообщение
 * @param <array{BillInfo}> data - список товаров и услуг, включенных в указанный счет
 */
export default () => new Promise(resolve => resolve({
  message: 'Fixture bill info',
  data: Array.from(Array(2 * randomNumb(1) + 1), () => new BillInfo()),
}))
