<template>
  <v-card class="elevation-5">
    <v-card-title>
      Gauges
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col v-for="(gauge, i) in gauges" :key="i" cols="12" sm="4" md="3">
          <Gauge
            :name="gauge.name"
            :min="gauge.min"
            :max="gauge.max"
            :value="gauge.value"
            :color="gauge.color"
            :unit="gauge.unit"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { randomNumber } from '@/utils/randomCustom.js'
import Gauge from '@/components/Chart/Gauge'

export default {
  name: 'GaugeChiller',
  components: {
    Gauge
  },
  data() {
    return {
      gauges: [],
      interval1: null,
      power: {
        name: 'Power',
        min: 0,
        max: 40,
        spMin: 0,
        spMax: 25,
        value: 0,
        unit: 'kW',
        old: 0
      },
      voltage: {
        name: 'Voltage',
        min: 0,
        max: 400,
        spMin: 350,
        spMax: 370,
        value: randomNumber(340, 400),
        unit: 'V',
        old: 0
      },
      current: {
        name: 'Current',
        min: 0,
        max: 100,
        spMin: 0,
        spMax: 30,
        value: randomNumber(0, 100),
        unit: 'A',
        old: 0
      }
    }
  },

  created() {
    this.initData()
    this.gauges = [this.power, this.voltage, this.current]
    this.interval1 = setInterval(() => {
      this.initData()
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.interval1)
  },
  methods: {
    initData() {
      this.voltage.old = this.voltage.value
      this.current.old = this.current.value
      this.power.old = this.power.value
      this.voltage.value = randomNumber(340, 400)
      this.current.value = randomNumber(0, 100)
      this.power.value = (this.voltage.value * this.current.value) / 1000
      this.power.color = this.getColor(this.power)
      this.voltage.color = this.getColor(this.voltage)
      this.current.color = this.getColor(this.current)
      this.chackValue(this.power)
      this.chackValue(this.voltage)
      this.chackValue(this.current)
    },
    getColor(ele) {
      let color = ''
      if (ele.value < ele.spMin) {
        color = '#F44336'
      } else if (ele.value >= ele.spMin && ele.value <= ele.spMax)
        color = '#4CAF50'
      else if (ele.value > ele.spMax) color = '#F44336'
      return color
    },
    getName(n) {
      return 'gauge' + n
    },
    chackValue(ele) {
      const alert = {
        target: 'enegyLogs',
        header: ele.name,
        text: ''
      }
      // console.log(alert)

      if (ele.value > ele.spMax && ele.old < ele.spMax) {
        alert.text = `${alert.header} high sp`
        this.$store.commit('chiller/ADD_LOGS', alert)
      } else if (ele.value < ele.spMin && ele.old > ele.spMin) {
        alert.text = `${alert.header} lower sp`
        this.$store.commit('chiller/ADD_LOGS', alert)
      } else if (ele.value > ele.spMin && ele.old < ele.spMin) {
        alert.text = `${alert.header} in range sp`
        this.$store.commit('chiller/ADD_LOGS', alert)
      } else if (ele.value < ele.spMax && ele.old > ele.spMax) {
        alert.text = `${alert.header} in range sp`
        this.$store.commit('chiller/ADD_LOGS', alert)
      }
    }
  }
}
</script>

<style></style>
