<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    chartdata2: {
      type: Object,
      default: null
    },
    options2: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata2, this.options2)
  }
}
</script>

<style>

</style>