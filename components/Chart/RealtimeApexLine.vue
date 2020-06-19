<template>
  <apexchart
    :ref="id"
    width="100%"
    type="line"
    :height="height"
    :options="options"
    :series="series"
  ></apexchart>
</template>

// TODO:make to component new pie chart

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
          id: 'realtime',
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 500
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Dynamic Updating Chart',
          align: 'left'
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'numeric',
          range: 20
        },
        yaxis: {
          max: 100,
          min: 0
        },
        legend: {
          show: false
        }
      })
    },
    chartdata: {
      type: Array,
      default: () => {
        return []
      }
    },
    isupdate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      interval: null,
      series: []
    }
  },
  watch: {
    isupdate(val) {
      if (val) {
        // console.log('updated', this.series)
        this.$refs[this.id].updateSeries(this.series)
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.series = this.chartdata
    }
  }
}
</script>
