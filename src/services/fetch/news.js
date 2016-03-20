import { fetchFactory, URL, fixtures } from './utils'

var name = 'news'
var regexp = {
  item: /(?:<item>)(.+?)(?:<\/item>)/ig,
  CDATA: /(?:\!\[CDATA\[\s+?)(.+?)(?:\s+?]])/i,
}

export default fetchFactory({
  url: URL[name],
  fixture: fixtures[name],
  parser: parseRSSNews,
})

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
  constructor(item) {
    this.id = this.parseTag('id', item) | 0
    this.title = this.parseTag('title', item)
    this.date = this.parseTag('timestamp', item) * 1000
    this.image = this.parseTag('image', item)
    this.link = this.parseTag('link', item)
    this.content = (this.parseTag('text', item).match(regexp.CDATA) || [])[1]
    this.description = (this.parseTag('description', item).match(regexp.CDATA) || [])[1]
  }

  parseTag(tag, str) {
    var regexp = new RegExp(`(?:<${tag}>)(.+?)(?:<\/${tag}>)`, 'i')
    return str.match(regexp)[1]
  }
}

/**
 * Список новостей, распарсенных с RSS
 * @return <array{string}> — список распарсенных новостей с RSS
 */
function parseRSSNews({ data }) {
  return data.replace(/\s/g, ' ')
    .match(regexp.item)
    .map( item => new News(item) )
}
