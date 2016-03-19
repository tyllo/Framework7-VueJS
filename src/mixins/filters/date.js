import { moment } from 'commons'

const FORMAT = 'L'
const FORMAT_EXTEND = 'LL'

export default {
  filters: {
    date(date) {
      return moment(date).format(FORMAT)
    },

    dateFull(date) {
      return moment(date).format(FORMAT_EXTEND)
    },

    rangeDate(container) {
      var date_in = moment(container.date_in).format(FORMAT)
      var date_out = moment(container.date_out).format(FORMAT)
      return `${date_in} - ${date_out}`
    },
  },
}
