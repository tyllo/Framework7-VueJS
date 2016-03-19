import { randomDate, randomNumb } from './utils'

var content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt id nisi optio, consequuntur nesciunt quaerat fugiat placeat sed, corporis cupiditate culpa! Officia voluptatibus doloremque, numquam asperiores quam saepe odio illum eum, in placeat. Maiores ea culpa voluptatum dolores hic rerum, nulla non minus earum dignissimos harum incidunt! Velit incidunt obcaecati ab dolorem totam placeat eaque est repudiandae exercitationem, numquam, vitae ullam, dicta reiciendis sint cupiditate at a similique. Tempore quam ullam nulla, veritatis illo quisquam cumque facilis accusantium architecto rem fuga accusamus ab, earum officia recusandae autem aliquam? Commodi eum optio iure ratione nesciunt non eaque explicabo ipsa quod repellat consequatur distinctio molestiae cupiditate reprehenderit sunt, ipsam magnam autem sequi quis quo impedit sed maxime, velit. Deserunt dolores a nam, totam non ab, officiis vero consectetur sed iure recusandae atque in tempora obcaecati illo eos pariatur quidem suscipit quo molestiae, ut. Ullam ea cumque aperiam quasi ab quam quis architecto harum repellendus distinctio incidunt porro odio, molestiae deserunt sapiente rem, nihil, adipisci provident eveniet beatae quisquam ex aliquam! Quae ea minus doloremque voluptates suscipit, consectetur amet ex fuga placeat deserunt dolores odio ducimus mollitia magnam consequatur blanditiis necessitatibus totam, fugiat sit reiciendis, adipisci quas dolorum! Est perspiciatis optio odio quae.'

/**
 * Информация о новости
 * @param {number} id — индентификатор новости
 * @param {string} title — заголвок новости
 * @param {unixtime} date — дата создания новости
 * @param {string} image — ссылка на картинку к новости

 * @param {string} link — ссылка на новость
 * @param {string} content — содержание новости
 * @param {string} description — короткое описание новости
 */
export class News {
  constructor() {
    this.id = randomNumb(2)
    this.title = `Title ${this.id}`
    this.date = randomDate()
    this.image = `https://unsplash.it/400/200/?random=${this.id}`
    this.content = content
    this.link = ''
    this.description = ''
  }
}

/**
 * @return <array{News}> — список новостей
 */
export default () => new Promise( resolve => resolve(
  Array.from(Array(2 * randomNumb(1)), () => new News())
))
