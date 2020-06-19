<template>
  <v-row>
    <v-col v-for="(item, index) in valves" :key="index" cols="12" sm="6" md="4">
      <v-card>
        <v-row>
          <v-col cols="12" align="center">
            <v-img :src="logoUrl" width="250" />
          </v-col>
        </v-row>
        <v-card-title primary-title class="pa-2">
          {{ item.name }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">Set point :</v-col>
            <v-col cols="6">{{ item.setPoint }} %</v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Current value :</v-col>
            <v-col cols="6">{{ item.currentValue }} %</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Status :</v-col>
            <v-col>
              <v-btn :color="item.isSetpoint ? 'success' : 'warning'">
                {{ getStatusName(item.dir) }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { randomNumber } from '@/utils/randomCustom'

export default {
  name: 'ChillerBelimoValve',
  data() {
    return {
      name: 'Belimo valve',
      logoUrl: require('@/static/images/Belimo-Logo.png'),
      valves: [
        {
          name: 'CCV Valve 1',
          setPoint: 0,
          currentValue: 0,
          isSetpoint: false,
          resetSetpoint: false,
          dir: 0
        },
        {
          name: 'CCV Valve 2',
          setPoint: 0,
          currentValue: 0,
          isSetpoint: false,
          resetSetpoint: false,
          dir: 0
        },
        {
          name: 'CCV Valve 3',
          setPoint: 0,
          currentValue: 0,
          isSetpoint: false,
          resetSetpoint: false,
          dir: 0
        }
      ],
      setPoint: 0,
      currentValue: 0,
      interval1: null
    }
  },
  computed: {
    getStatusName() {
      return (value) => {
        if (value === 0) {
          return 'Stop'
        } else if (value === 1) {
          return 'Turning Up'
        } else if (value === 2) {
          return 'Turning Down'
        }
      }
    }
  },
  mounted() {
    this.setMyinterval()
  },
  beforeDestroy() {
    clearInterval(this.interval1)
  },
  methods: {
    genSetpoint(valve) {
      valve.setPoint = randomNumber(0, 120)
      valve.dir = 0
    },
    increaseValue(valve) {
      if (valve.currentValue > valve.setPoint)
        return (valve.currentValue = valve.setPoint)
      valve.currentValue += 1
      valve.dir = 1
    },
    decreaseValue(valve) {
      if (valve.currentValue < valve.setPoint)
        return (valve.currentValue = valve.setPoint)
      valve.dir = 2
      valve.currentValue -= 1
    },
    setMyinterval() {
      this.valves.forEach((e) => {
        this.genSetpoint(e)
        e.isSetpoint = false
      })
      this.interval1 = setInterval(() => {
        this.valves.forEach((e) => {
          if (e.isSetpoint === false) {
            if (e.setPoint > e.currentValue) this.increaseValue(e)
            else if (e.setPoint < e.currentValue) this.decreaseValue(e)
            else {
              e.isSetpoint = true
              e.resetSetpoint = true
            }
          }
          if (e.isSetpoint === true && e.resetSetpoint === true) {
            e.resetSetpoint = false
            e.dir = 0
            setTimeout(() => {
              e.isSetpoint = false
              this.genSetpoint(e)
            }, 5000)
          }
        })
      }, 500)
    }
  }
}
</script>

<style></style>
