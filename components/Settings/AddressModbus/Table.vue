<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <v-row>
          <v-col cols="6">
            <h3 class="headline mb-0">{{ title }} table</h3>
          </v-col>
          <v-col align="end">
            <v-btn color="primary" dark @click="clickInsert()">
              Insert
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <client-only>
        <v-data-table :headers="headers" :items="items" :items-per-page="5">
          <template v-slot:body="props">
            <tbody>
              <tr
                v-for="(item, i) in props.items"
                :key="i"
                :style="items.indexOf(item) % 2 ? '' : 'background: #BDBDBD'"
              >
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.Device.name }}</td>
                <td>{{ item.AddressType.name }}</td>
                <td>{{ formatTime(item.createdAt) }}</td>
                <td>
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteConfirm(item)">
                    mdi-delete
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </client-only>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddressModbusTable',
  components: {},
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('addressModbus', ['dialogShow']),
    formatTime() {
      return (time) => moment(time).format('DD/MM/YYYY HH:mm')
    }
  },
  methods: {
    ...mapActions({
      setDeviceToForm: 'addressModbus/setDeviceToForm',
      changeDialog: 'addressModbus/changeDialog',
      changeDialogDelete: 'addressModbus/changeDialogDelete',
      setWaitEvent: 'addressModbus/setWaitEvent',
      changeDevice: 'addressModbus/changeDevice'
    }),
    clickInsert() {
      this.changeDialog(true)
      this.changeDevice(this.title)
    },
    deleteConfirm(item) {
      this.changeDialogDelete(true)
      this.setWaitEvent(item)
    },
    editItem(item) {
      this.setWaitEvent(item)
      this.changeDialog(true)
    }
  }
}
</script>

<style></style>
