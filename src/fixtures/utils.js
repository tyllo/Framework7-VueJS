import { moment } from 'commons'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const MIN_TIME = moment('01-01-2000', 'MM-DD-YYYY')

export function randomDate(minTime = MIN_TIME) {
  var diff = moment().valueOf() - minTime
  diff = diff * Math.random()
  return moment(minTime + diff).valueOf()
}

export function randomNumb(exponent = 5) {
  return Math.floor(Math.random() * Math.pow(10, exponent))
}

export function randomChar(n = 5) {
  var str = ''

  for (let i = 0; i <= n - 1; i++) {
    let index = randomNumb(n) % ALPHABET.length
    str = str + ALPHABET[index]
  }

  return str
}

export let ContainerNumb = () => randomChar(5) + randomNumb(7)
