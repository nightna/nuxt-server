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
import DevicesTable from '@/components/Settings/AddressType/Table'
export default {
  name: 'SettingAddressType',
  components: {
    DevicesTable
  },
  data() {
    return {
      pageName: 'Address Type'
    }
  },
  computed: {
    ...mapState('addressType', ['tableHeader', 'tableItems'])
  },
  async beforeMount() {
    await this.getData()
  },
  methods: {
    ...mapActions({
      getData: 'addressType/getData'
    })
  }
}
</script>

<style></style>
