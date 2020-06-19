<template>
  <apexchart
    :id="id"
    width="100%"
    :height="height"
    :series="series"
    :options="options"
  ></apexchart>
</template>

<script>
import { generateArray } from '@/utils/randomCustom'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    height: {
      type: String || Number,
      default: '100px'
    },
    options: {
      type: Object,
      required: true
    },
    chartdata: {
      type: Array,
      default: () => {
        return [30, 40, 45, 50, 49]
      }
    }
  },
  data() {
    return {
      interval1: null,
      series: []
    }
  },
  created() {
    this.series = this.chartdata
    this.interval1 = setInterval(() => {
      this.series = generateArray(4, 0, 100)
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.interval1)
  }
}
</script>

<style></style>
