<template>
  <v-card class="elevation-5">
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>
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
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'LogsAlert',
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
      if (text.indexOf('lower') > 0 || text.indexOf('high') > 0) return 'red'
      else return 'success'
    }
  }
}
</script>

<style></style>
