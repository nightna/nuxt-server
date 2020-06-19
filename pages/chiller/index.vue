<template>
  <client-only>
    <v-container>
      <h1>{{ pageName }}</h1>
      <v-row>
        <v-col cols="12" sm="12" md="4" lg="4">
          <PieChart
            id="pieChart"
            height="250px"
            :chartdata="pieData.series"
            :options="pieData.options"
          />
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="8">
          <LineChart
            id="lineChart"
            height="250px"
            :chartdata="realtime.series"
            :options="realtime.options"
          />
        </v-col>
      </v-row>
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
    </v-container>
  </client-only>
</template>

<!-- //TODO: max Data show -->

<script>
import {
  randomNumber,
  randomValue,
  generateArray
} from '@/utils/randomCustom.js'
import LineChart from '@/components/Chart/RealtimeApexLine.vue'
import PieChart from '@/components/Chart/ApexPie.vue'

export default {
  name: 'ChartDemo',
  components: {
    LineChart,
    PieChart
  },
  data: () => ({
    pageName: 'Chiller',
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
              speed: 1000
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
          text: 'Chiller temp',
          align: 'left'
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'numeric',
          range: 100
        },
        yaxis: {
          max: 100,
          min: 0
        },
        legend: {
          show: false
        }
      },
      series: Array(2).fill({ data: Array(21).fill(0) })
    },
    pieData: {
      options: {
        chart: {
          type: 'pie'
        },
        labels: ['ON', 'OFF', 'FIX', 'WARNING'],
        colors: ['#00E396', '#EA3546', '#546E7A', '#F9C80E']
      },
      series: generateArray(4, 0, 100)
    },
    isUpdate: false,
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
  beforeDestroy() {
    clearInterval(this.intervalLine)
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
      console.log(item.status)
    }
  }
}
</script>
