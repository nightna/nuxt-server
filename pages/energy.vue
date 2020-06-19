<template>
  <v-container>
    <h1>Energy (kWh / Unit)</h1>
    <v-card class="mb-3">
      <v-card-title primary-title class="headline"> Form </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="formatDated(date1)"
                    label="Start Date"
                    hint="DD/MM/YYYY format"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date1"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="formatDated(date2)"
                    label="Due Date"
                    hint="DD/MM/YYYY format"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date2"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="(item, index) in getAddressByType(1)"
              :key="index"
              cols="12"
              xs="4"
              sm="3"
              md="2"
            >
              <v-checkbox
                v-model="device[index]"
                :label="item.Device.name"
                hide-details="auto"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-btn
                color="primary"
                :disabled="device.length === 0"
                :loading="loading"
                @click="submit"
              >
                SUBMIT
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title primary-title>
        data
      </v-card-title>
      <v-card-text>
        <client-only>
          <LineChart name="LineChartAll" :height="400" :chartdata="allSeries" />
        </client-only>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import LineChart from '@/components/Energy/LineChart'

export default {
  name: 'Energy',
  components: {
    LineChart
  },
  data: () => ({
    loading: false,
    valid: true,
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    device: [],
    address: null,
    res: null,
    dataGroupByMouth: null,
    allSeries: [
      {
        name: 'line-1',
        data: []
      }
    ]
  }),

  computed: {
    formatDated() {
      return (date) => this.formatDate(date)
    },
    ...mapGetters({
      getAddressByType: 'addressModbus/getAddressByType'
    })
  },

  watch: {
    date1(val) {
      this.date1 = this.checkDate(val)
    },
    date2(val) {
      this.date2 = this.checkDateToDate(this.date1, val)
    },
    res(val) {
      if (val.data.length) {
        this.dataGroupByMouth = _.groupBy(val.data, (e) => {
          return moment(e.createdAt).format('YYYYMM')
        })

        const groupByAddressID = _.groupBy(val.data, (e) => {
          return e.AddressModbus.id
        })

        this.allSeries = _.map(groupByAddressID, (e) => {
          const sorted = _.sortBy(e, ['createdAt'])
          return {
            name: e[0].AddressModbus.Device.name,
            data: _.map(sorted, (d) => {
              return {
                x: moment(d.createdAt).format('DD/MM/YY'),
                y: d.value
              }
            })
          }
        })
        // console.log(groupByAddressID)
        // console.log(this.allSeries)

        // console.log(device)
      }
    }
  },

  async mounted() {
    await this.getAddress()
    this.address = this.getAddressByType(1)
    this.device = Array(this.address.length).fill(true)
    // console.log(this.address)
  },

  methods: {
    ...mapActions({
      getAddress: 'addressModbus/getData'
    }),
    async submit() {
      this.loading = true

      const addressChecker = this.address
        .filter((e, i) => this.device[i])
        .map((e) => e.id)

      const data = {
        startDate: this.date1,
        dueDate: this.date2,
        addressId: addressChecker
      }

      try {
        this.res = await this.$axios.post('/modbus/logDate/', data)
        // console.log(this.res.data)
      } catch (err) {
        console.log(err)
      }

      this.loading = false
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    checkDate(date) {
      const dif = moment().diff(moment(date))

      if (dif < 0) {
        date = moment().format('YYYY-MM-DD')
      }

      return date
    },
    checkDateToDate(date1, date2) {
      const difFromNow = moment().diff(moment(date2))
      const difFromDate1 = moment(date1).diff(moment(date2))
      // const date
      if (difFromNow < 0) {
        date2 = moment().format('YYYY-MM-DD')
      }

      if (difFromDate1 > 0 && difFromNow > 0) {
        date2 = date1
      }
      // console.log(difFromNow, difFromDate1)
      return date2
    }
  }
}
</script>

<style></style>
