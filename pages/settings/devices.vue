<template>
  <v-container>
    <DevicesTable
      :title="pageName"
      :headers="tableHeader"
      :items="tableItems"
      class="elevation-10"
    />
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DevicesTable from '@/components/Settings/Devices/Table'
export default {
  name: 'SettingDevices',
  components: {
    DevicesTable
  },
  data() {
    return {
      pageName: 'Devices'
    }
  },
  computed: {
    ...mapState('device', ['tableHeader', 'tableItems'])
  },
  async beforeMount() {
    await this.getData()
  },
  methods: {
    ...mapActions({
      getData: 'device/getData'
    }),
    sort(header) {
      if (header.sortable === false) {
        // console.log(header)
        return
      }
      if (header.value === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = header.value
      // console.log(header.value)
    }
  }
}
</script>

<style></style>
