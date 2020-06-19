<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <v-row>
          <v-col cols="6">
            <h3 class="headline mb-0">{{ title }} table</h3>
          </v-col>
          <v-col align="end">
            <v-btn color="primary" dark @click="changeDialog(true)">
              Insert
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <client-only>
        <v-data-table
          hide-default-header
          :headers="headers"
          :items="items"
          :items-per-page="10"
          class="mytable"
          dense
        >
          <template v-slot:body="props">
            <thead>
              <tr>
                <th
                  v-for="(item, i) in props.headers"
                  :key="i"
                  @click="sort(item)"
                >
                  {{ item.text }}
                  <v-icon
                    v-if="item.value === currentSort"
                    color="white"
                    dense
                    small
                  >
                    {{ headerIcon }}
                  </v-icon>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in props.items"
                :key="i"
                :style="i % 2 ? '' : 'background: #FFF176'"
              >
                <td id="id">
                  {{ i + 1 }}
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.ip }}</td>
                <td>{{ item.port }}</td>
                <td>{{ item.unitId }}</td>
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
    <FormDevice />
    <DeleteDialog />
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
import _ from 'lodash'
import FormDevice from './Form'
import DeleteDialog from './DeleteDialog'

export default {
  name: 'DevicesTable',
  components: {
    FormDevice,
    DeleteDialog
  },
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
  data() {
    return {
      currentSort: 'username',
      currentSortDir: 'asc'
    }
  },
  computed: {
    headerIcon() {
      return this.currentSortDir === 'asc' ? 'mdi-arrow-down' : 'mdi-arrow-up'
    },
    sortedItems() {
      return _.orderBy(this.items, [this.currentSort], [this.currentSortDir])
    },
    formatTime() {
      return (time) => moment(time).format('DD/MM/YYYY HH:mm')
    }
  },
  methods: {
    ...mapActions({
      changeDialog: 'device/changeDialog',
      changeDialogDelete: 'device/changeDialogDelete',
      setWaitEvent: 'device/setWaitEvent'
    }),
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
