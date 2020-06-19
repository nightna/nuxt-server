<template>
  <v-card>
    <v-card-title>
      {{ name }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            item-key="name"
            class="elevation-1"
          >
            <template v-slot:item.text="{ item }">
              <v-chip :color="getColor(item.text)" dark>
                {{ item.text }}
              </v-chip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'LogsGauge',
  props: {
    name: {
      type: String,
      default: 'table'
    },
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.$store.commit('chiller/RESET_LOGS')
    // console.log(this.$store.state.chiller.watersLogs.items)
  },
  methods: {
    getColor(text) {
      if (text.indexOf('high') > 0 || text.indexOf('lower') > 0) return 'red'
      else return 'success'
    }
  }
}
</script>

<style></style>
