/* eslint-disable */
<template>
  <client-only>
    <v-container id="container" name="container">
      <h1>{{ pageName + $route.params.id }}</h1>
      <v-btn color="success" @click="generatePDF2()">report</v-btn>
      <div id="print" ref="content">
        <ChillerLineChart id="realtimeChart" />
        <BelimoValve id="BelimoValve" />
        <LogsAlert
          id="LogsAlert"
          name="Chiller water logs"
          :headers="$store.state.chiller.waterLogs.headers"
          :items="$store.state.chiller.waterLogs.items"
          class="mb-3"
        />
        <GaugeChiller class="mb-3" />
        <LogsGauge
          name="Enegy logs"
          :headers="$store.state.chiller.enegyLogs.headers"
          :items="$store.state.chiller.enegyLogs.items"
          class="mb-3"
        />
        <v-row>
          <v-col cols="12"><h3 class="ml-2">Table</h3></v-col>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              item-key="name"
              class="elevation-1"
            >
              <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item.status)" dark>
                  {{ item.status }}
                </v-chip>
              </template>
              <template v-slot:item.alarm="{ item }">
                <v-chip :color="getColor(item.alarm)" dark>
                  {{ item.alarm }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      block
                      color="success"
                      :disabled="item.status === 'WARNING'"
                      @click="SWITCH_STATUS(item, 'ON')"
                    >
                      {{ item.actions[0] }}
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      block
                      color="error"
                      :disabled="item.status === 'WARNING'"
                      @click="SWITCH_STATUS(item, 'OFF')"
                    >
                      {{ item.actions[1] }}
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </div>
      <div id="export"></div>
    </v-container>
  </client-only>
</template>

<!-- //TODO: max Data show -->

<script>
import { randomNumber, randomValue } from '@/utils/randomCustom.js'
import ChillerLineChart from '@/components/Chiller/ChillerLineChart'
import LogsAlert from '@/components/Chiller/LogsAlert'
import GaugeChiller from '@/components/Chiller/GaugeChiller'
import LogsGauge from '@/components/Chiller/LogsGauge'
import BelimoValve from '@/components/Chiller/BelimoValve'

export default {
  name: 'ChartDemo',
  components: {
    ChillerLineChart,
    LogsAlert,
    GaugeChiller,
    LogsGauge,
    BelimoValve
  },
  data: () => ({
    pageName: 'Chiller',
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name'
      },
      { text: 'temp', value: 'temp' },
      { text: 'status', value: 'status' },
      { text: 'Alarm', value: 'alarm' },
      { text: 'actions', value: 'actions' }
    ],
    desserts: [],
    statusAll: ['ON', 'OFF', 'WARNING']
  }),
  async created() {
    await this.fillDataTable()
  },
  methods: {
    getColor(status) {
      if (status === 'ON' || status === 'NORMAL') return 'green'
      else if (status === 'OFF' || status === 'ALARM') return 'red'
      else return 'orange'
    },
    fillDataTable() {
      let arr = Array(5).fill(null)
      arr = arr.map((e, i) => ({
        name: `Chiller ${++i}`,
        temp: randomNumber(-100, 100),
        status: randomValue(this.statusAll),
        alarm: randomValue(['NORMAL', 'ALARM']),
        actions: ['ON', 'OFF']
      }))
      // console.log(arr)

      this.desserts = arr
    },
    SWITCH_STATUS(item, value) {
      item.status = value
      // console.log(item.status)
    },
    async generatePDF2() {
      if (process.client) {
        const JsPDF = require('jspdf')
        const domtoimage = require('dom-to-image')
        const paperSize = {
          width: 210,
          heigth: 297
        }
        const png = await domtoimage.toJpeg(this.$refs.content, {
          bgcolor: '#FFFFFF'
        })

        const img = new Image()
        img.src = png
        const doc = new JsPDF('portrait', 'mm', 'a4')
        doc.addImage(
          png,
          'JPEG',
          5,
          5,
          paperSize.width - 5,
          paperSize.heigth - 5
        )
        doc.save('testttt.pdf')
      }
    }
  }
}
</script>
