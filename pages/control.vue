<template>
  <v-container>
    <h1>Control</h1>
    <Analog :name="analogOutput.name" :sliders="analogOutput.sliders" />
    <Analog :name="analogInput.name" :sliders="analogInput.sliders" input />
    <Digital :name="digitalOutput.name" :btns="digitalOutput.btns" />
    <Digital
      :name="digitalInput.name"
      :btns="digitalInput.btns"
      :type="digitalInput.type"
      :input="true"
    />
  </v-container>
</template>

<!-- TODO:Get data from unipi -->

<script>
import Digital from '@/components/Control/Digital.vue'
import Analog from '@/components/Control/Analog.vue'

export default {
  name: 'Control',
  components: {
    Digital,
    Analog
  },
  data() {
    return {
      media: 0,
      digitalOutput: {
        name: 'Digital output',
        type: 'block',
        btns: [
          { name: 'DO1', status: true },
          { name: 'DO2', status: true },
          { name: 'DO3', status: false },
          { name: 'DO4', status: true },
          { name: 'DO5', status: true },
          { name: 'DO6', status: false },
          { name: 'DO7', status: true },
          { name: 'DO8', status: true },
          { name: 'DO9', status: false },
          { name: 'DO10', status: true },
          { name: 'DO11', status: false },
          { name: 'DO12', status: true }
        ]
      },
      digitalInput: {
        name: 'Digital input',
        type: '!block',
        btns: [
          { name: 'DI1', status: false },
          { name: 'DI2', status: true },
          { name: 'DI3', status: false },
          { name: 'DI4', status: false },
          { name: 'DI5', status: true },
          { name: 'DI6', status: false },
          { name: 'DI7', status: false },
          { name: 'DI8', status: true },
          { name: 'DI9', status: false },
          { name: 'DI10', status: false },
          { name: 'DI11', status: true },
          { name: 'DI12', status: false }
        ]
      },
      analogOutput: {
        name: 'Analog output',
        sliders: [
          { name: 'AO0', value: 0 },
          { name: 'AO1', value: 0 },
          { name: 'AO2', value: 0 },
          { name: 'AO3', value: 0 },
          { name: 'AO4', value: 0 }
        ]
      },
      analogInput: {
        name: 'Analog input',
        sliders: [
          { name: 'AO0', value: 0 },
          { name: 'AO1', value: 25 },
          { name: 'AO2', value: 50 },
          { name: 'AO3', value: 75 },
          { name: 'AO4', value: 100 }
        ]
      },
      itemsPerPage: 4,
      items: [
        {
          name: 'Digital input',
          data: [
            { name: 'DI1', status: false, address: 30 },
            { name: 'DI2', status: true, address: 31 },
            { name: 'DI3', status: false, address: 32 },
            { name: 'DI4', status: false, address: 33 },
            { name: 'DI5', status: true, address: 34 },
            { name: 'DI6', status: false, address: 35 },
            { name: 'DI7', status: false, address: 36 },
            { name: 'DI8', status: true, address: 37 },
            { name: 'DI9', status: false, address: 38 },
            { name: 'DI10', status: false },
            { name: 'DI11', status: true },
            { name: 'DI12', status: false }
          ]
        },
        {
          name: 'Digital output',
          data: [
            { name: 'DO1', value: true },
            { name: 'DO2', value: true },
            { name: 'DO3', value: false },
            { name: 'DO4', value: true },
            { name: 'DO5', value: true },
            { name: 'DO6', value: false },
            { name: 'DO7', value: true },
            { name: 'DO8', value: true },
            { name: 'DO9', value: false },
            { name: 'DO10', value: true },
            { name: 'DO11', value: false },
            { name: 'DO12', value: true }
          ]
        }
      ]
    }
  },
  methods: {
    async SW_TOGGLE(item, value) {
      const url = this.$store.state.urlUnipiWrite
      const command = {
        fc: 6,
        unitid: 5,
        address: item.address || 31,
        quantity: 1,
        value: Number(value)
      }
      // console.log(item, url, value, command)
      try {
        const res = await this.$store.dispatch('control/SEND_COMMAND', {
          url,
          command
        })
        console.log(res.data)
        item.status = value
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
