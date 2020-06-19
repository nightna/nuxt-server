<template>
  <v-layout v-if="false" column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>Home</h1>
      <h2>Count: {{ count }}</h2>
      <v-btn color="success" @click="ADD_COUNT()">add</v-btn>
      <v-btn color="success" @click="$store.dispatch('test_api')">
        TEST API
      </v-btn>
      <v-alert
        v-if="$store.state.msgTestApi ? true : false"
        :type="$store.state.isError ? 'error' : 'success'"
        :value="true"
        class="mt-3"
      >
        {{ $store.state.msgTestApi }}
      </v-alert>
      <v-btn
        color="success"
        @click="OPEN_NOTI({ color: 'success', text: 'test test' })"
      >
        TEST SNACKBAR
      </v-btn>
      <v-btn color="success" @click="generatePDF()">
        TEST PDF
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.$router.push('/chiller/1')
  },
  methods: {
    ADD_COUNT() {
      this.count++
    },
    OPEN_NOTI(noti) {
      this.$store.dispatch('notification/ADD_NOTI', noti)
    },
    generatePDF() {
      if (process.client) {
        const Pdf = require('jspdf')
        const moment = require('moment')
        require('jspdf-autotable')

        const doc = new Pdf()
        console.log(doc)
        doc.text('Report at ' + moment().format('hh:mm:ss DD/MM/YYYY'), 15, 15)
        doc.autoTable({
          startY: 20,
          head: [['Name', 'Email', 'Country']],
          body: [
            ['David', 'david@example.com', 'Sweden'],
            ['Castille', 'castille@example.com', 'Spain']
          ]
        })
        doc.save('newPDF' + Date.now())
        // ...your code
      }

      // doc.text('this is PDF', 10, 10)
      // doc.save('PDF' + Date.now())
    }
  }
}
</script>
