<template>
  <LineChart
    id="lineChart"
    height="250px"
    :series="chartdata"
    :options="realtime.options"
  />
</template>

<script>
import LineChart from '@/components/Chart/ApexLine'

export default {
  name: 'EnergyLineChart',
  components: {
    LineChart
  },
  props: {
    name: {
      type: String,
      default: 'LineChart'
    },
    height: {
      type: Number,
      default: 350
    },
    chartdata: {
      type: Array,
      required: true
    }
    // xAxis: {
    //   type: Array,
    //   required: true
    // }
  },
  data() {
    return {
      realtime: {
        options: {
          chart: {
            id: this.name,
            height: this.height,
            type: 'line',
            animations: {
              enabled: true,
              easing: 'linear',
              dynamicAnimation: {
                speed: 500
              }
            },
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          markers: {
            size: 0
          },
          // xaxis: {
          //   categories: this.xAxis
          // },
          // yaxis: {
          //   max: 80,
          //   min: 30
          // },
          legend: {
            show: true
          }
        }
      }
    }
  }
}
</script>

<style></style>
