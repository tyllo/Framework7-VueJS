/**
 * Переназываем склады
 */

export default {
  filters: {
    stock(stock) {
      return (stock === 'ПИК')
        ? this.$t('containers.PIK')
        : this.$t('containers.VSCT')
    }
  }
}
