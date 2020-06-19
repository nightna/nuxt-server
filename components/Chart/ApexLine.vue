<template>
  <apexchart
    width="100%"
    type="line"
    :height="height"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  name: 'LineChart',
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
      default: () => ({
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      })
    },
    series: {
      type: Array,
      default: () => {
        return [
          {
            name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ]
      }
    },
    isupdate: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isupdate(val) {
      if (val) {
        console.log('chart update')
      }
    }
  }
}
</script>
