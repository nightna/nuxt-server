<template>
  <v-container>
    <div v-for="(name, i) in getDeviceNameAll" :key="i">
      <DevicesTable
        :title="name"
        :headers="tableHeader"
        :items="getAddressByGroupDevice(name)"
        class="elevation-10 mb-5"
      />
    </div>
    <FormAddressModbus />
    <DeleteDialog />
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import FormAddressModbus from '@/components/Settings/AddressModbus/Form'
import DeleteDialog from '@/components/Settings/AddressModbus/DeleteDialog'
import DevicesTable from '@/components/Settings/AddressModbus/Table'

export default {
  name: 'SettingAddressModbus',
  components: {
    DevicesTable,
    FormAddressModbus,
    DeleteDialog
  },
  data() {
    return {
      pageName: 'Address Modbus'
    }
  },
  computed: {
    ...mapState('addressModbus', ['tableHeader', 'tableItems']),
    ...mapGetters('addressModbus', [
      'getDeviceName',
      'getAddressByGroupDevice'
    ]),
    ...mapGetters('device', ['getDeviceNameAll'])
  },
  async mounted() {
    await this.getData()
    await this.getDevice()
    await this.getAddressType()
  },
  methods: {
    ...mapActions({
      getData: 'addressModbus/getData',
      getDevice: 'device/getData',
      getAddressType: 'addressType/getData'
    })
  }
}
</script>

<style></style>
