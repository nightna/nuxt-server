<template>
  <v-row>
    <v-col cols="12">
      <v-card class="elevation-5">
        <v-card-title class="pb-0">
          Chiller water
        </v-card-title>
        <v-card-text>
          <LineChart
            id="lineChart"
            height="250px"
            :chartdata="realtime.series"
            :options="realtime.options"
            :isupdate="realtimeUpdate"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { randomNumber } from '@/utils/randomCustom.js'
import LineChart from '@/components/Chart/RealtimeApexLine'

export default {
  name: 'ChillerLineChart',
  components: {
    LineChart
  },
  data() {
    return {
      realtimeInterval: null,
      realtimeSetpoint: 45,
      count: 0,
      realtimeUpdate: false,
      realtime: {
        options: {
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
            curve: 'smooth',
            width: [1, 2, 2, 2]
          },
          markers: {
            size: 0
          },
          xaxis: {
            type: 'numeric',
            range: 100
          },
          yaxis: {
            max: 80,
            min: 30
          },
          legend: {
            show: true
          }
        },
        series: [
          { name: 'set point (°F)', data: [{ x: 0, y: 45 }] },
          {
            name: 'Supply Temp (°F)',
            data: [{ x: 0, y: randomNumber(42, 50) }]
          },
          {
            name: 'Return Temp (°F)',
            data: [{ x: 0, y: randomNumber(50, 55) }]
          },
          {
            name: 'Header pressures (bar)',
            data: [{ x: 0, y: randomNumber(40, 50) }]
          }
        ]
      }
    }
  },
  mounted() {
    this.addRealTimeData()
  },
  beforeDestroy() {
    clearInterval(this.realtimeInterval)
  },
  methods: {
    addRealTimeData() {
      this.realtimeInterval = setInterval(() => {
        const x = ++this.count
        this.setData(x)
        this.setUpdate()
      }, 500)
    },
    setData(x) {
      this.realtime.series.forEach((e, i) => {
        let ranNum = 0
        if (i === 0) {
          e.data.push({ x, y: this.realtimeSetpoint })
        } else if (i === 1) {
          ranNum = randomNumber(42, 50)
          e.data.push({ x, y: ranNum })
        } else if (i === 2) {
          ranNum = randomNumber(50, 55)
          e.data.push({ x, y: ranNum })
        } else if (i === 3) {
          ranNum = randomNumber(50, 60)
          e.data.push({ x, y: ranNum })
        }

        if (i !== 0) {
          this.chackTemp(this.realtimeSetpoint, ranNum, i)
        }
      })
    },
    setUpdate() {
      this.realtimeUpdate = false
      setTimeout(() => {
        this.realtimeUpdate = true
      }, 50)
    },
    chackTemp(sp, temp, i) {
      // console.log(sp, temp, i)
      const data = this.realtime.series[i].data
      const len = data.length
      const old = data[len - 2].y
      const current = data[len - 1].y
      // console.log(current, old)
      const alert = {
        target: 'waterLogs',
        header: this.realtime.series[i].name,
        text: ''
      }
      if (sp > current && sp <= old) {
        // console.log('lower sp', sp, temp, current, i)
        alert.text = `${alert.header} lower sp`
        this.$store.commit('chiller/ADD_LOGS', alert)
      }
      if (sp < current && sp >= old) {
        alert.text = `${alert.header} high sp`
        // console.log('High sp', sp, temp, current, i)
        this.$store.commit('chiller/ADD_LOGS', alert)
      }
      if (sp === current) {
        // console.log('is set point')
        alert.text = `${alert.header} equal sp`
        this.$store.commit('chiller/ADD_LOGS', alert)
      }
    }
  }
}
</script>

<style></style>
