export default {
  filters: {
    formatSumm(value) {
      return (value + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    },
  },
}
