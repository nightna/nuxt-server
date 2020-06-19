<template>
  <v-container>
    <h1>Control 2</h1>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="mb-2" flat>
          <h2>Digital</h2>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="5"
            lg="4"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                <div class="">{{ item.name }}</div>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark @click="hideCard(item)"
                  ><v-icon>{{
                    item.hide ? 'mdi-plus' : 'mdi-minus'
                  }}</v-icon></v-btn
                >
              </v-card-title>
              <div v-show="!item.hide">
                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item v-for="list in item.data" :key="list.key">
                    <v-list-item-content class="align-start">
                      <v-row justify="center">
                        <v-col
                          cols="6"
                          class="pa-3"
                          align="center"
                          justify="center"
                        >
                          <div>{{ list.name }} :</div>
                        </v-col>
                        <v-col cols="6" class="pa-2" align="start">
                          <v-chip
                            :color="list.value ? 'success' : 'error'"
                            justify-center
                          >
                            {{ list.value ? 'ON' : 'OFF' }}
                          </v-chip>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                    <v-list-item-content v-if="item.isToggle">
                      <v-row justify="end" align="center">
                        <!-- <v-col cols="12" xs="12" sm="6" md="6">
                          <v-btn
                            color="success"
                            block
                            :disabled="
                              isDisabled(list.value, true) || list.disabled
                            "
                            @click="SW_TOGGLE(list, true)"
                            >ON
                          </v-btn>
                        </v-col>
                        <v-col cols="12" xs="12" sm="6" md="6">
                          <v-btn
                            color="error"
                            block
                            :disabled="
                              isDisabled(list.value, false) || list.disabled
                            "
                            @click="SW_TOGGLE(list, false)"
                            >OFF</v-btn
                          >
                        </v-col> -->
                        <v-col cols="5" align="center">
                          <v-btn
                            fab
                            dark
                            small
                            :color="list.value ? 'error' : 'success'"
                            @click="SW_TOGGLE(list, !list.value)"
                          >
                            {{ list.value ? 'OFF' : 'ON' }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<!-- TODO:Get data from unipi -->

<script>
export default {
  name: 'Control',
  components: {},
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
          hide: false,
          data: [
            { name: 'DI1', value: false, address: 30 },
            { name: 'DI2', value: true, address: 31 },
            { name: 'DI3', value: false, address: 32 },
            { name: 'DI4', value: false, address: 33 },
            { name: 'DI5', value: true, address: 34 },
            { name: 'DI6', value: false, address: 35 },
            { name: 'DI7', value: false, address: 36 },
            { name: 'DI8', value: true, address: 37 },
            { name: 'DI9', value: false, address: 38 },
            { name: 'DI10', value: false },
            { name: 'DI11', value: true },
            { name: 'DI12', value: false }
          ]
        },
        {
          name: 'Digital output',
          hide: false,
          isToggle: true,
          data: [
            {
              name: 'DO1',
              value: true,
              address: 30,
              countNoti: 0,
              disabled: false
            },
            {
              name: 'DO2',
              value: true,
              address: 31,
              countNoti: 0,
              disabled: false
            },
            {
              name: 'DO3',
              value: false,
              address: 32,
              countNoti: 0,
              disabled: false
            },
            {
              name: 'DO4',
              value: true,
              address: 33,
              countNoti: 0,
              disabled: false
            },
            {
              name: 'DO5',
              value: true,
              address: 34,
              countNoti: 0,
              disabled: false
            },
            {
              name: 'DO6',
              value: false,
              address: 35,
              countNoti: 0,
              disabled: false
            },
            {
              name: 'DO7',
              value: true,
              address: 36,
              countNoti: 0,
              disabled: false
            },
            {
              name: 'DO8',
              value: true,
              address: 37,
              countNoti: 0,
              disabled: false
            },
            {
              name: 'DO9',
              value: false,
              address: -1,
              countNoti: 0,
              disabled: false
            },
            {
              name: 'DO10',
              value: true,
              address: -1,
              countNoti: 0,
              disabled: false
            },
            {
              name: 'DO11',
              value: false,
              address: -1,
              countNoti: 0,
              disabled: false
            },
            {
              name: 'DO12',
              value: true,
              address: -1,
              countNoti: 0,
              disabled: false
            }
          ]
        }
      ]
    }
  },
  computed: {
    isDisabled() {
      return (status, value) => status === value
    }
  },
  methods: {
    async SW_TOGGLE(item, value) {
      console.log(item)
      const url = this.$store.state.urlUnipiWrite
      const command = {
        fc: 6,
        unitid: 5,
        address: item.address || 31,
        quantity: 1,
        value: Number(value)
      }
      console.log(item, url, value, command)
      try {
        const res = await this.$store.dispatch('control/SEND_COMMAND', {
          url,
          command,
          name: item.name
        })
        console.log(res)
        if (res.err) {
          return
        }
        item.value = value
      } catch (err) {
        console.log(err)
      }
    },
    hideCard(item) {
      console.log(item)
      item.hide = !item.hide
    }
  }
}
</script>
<style lang="scss" scoped></style>
