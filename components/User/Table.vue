<template>
  <client-only>
    <v-data-table
      :headers="headers"
      :items="sortedItems"
      :items-per-page="10"
      item-key="id"
      hide-default-header
      dense
      :search="search"
      :custom-filter="filterText"
      class="mytable"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          append-icon="mdi-search"
          label="Search"
          solo
          class="mb-3"
          hide-details="auto"
        ></v-text-field>
      </template>
      <template v-slot:body="props">
        <thead>
          <tr>
            <th v-for="(item, i) in props.headers" :key="i" @click="sort(item)">
              {{ item.text }}
              <v-icon
                v-if="item.value === currentSort"
                color="white"
                dense
                small
              >
                {{ headerIcon }}</v-icon
              >
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
            <td id="actions">
              <v-icon small class="mr-2 " @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteConfirm(item)">
                mdi-delete
              </v-icon>
            </td>
            <td @click="clickUserRow(item)">{{ item.username }}</td>
            <td @click="clickUserRow(item)">{{ item.Role.name }}</td>
            <td @click="clickUserRow(item)">
              {{ formatTime(item.createdAt) }}
            </td>
            <td @click="clickUserRow(item)">
              {{ formatTime(item.updatedAt) }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </client-only>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
  name: 'UserTable',
  props: {
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
      search: '',
      currentSort: 'username',
      currentSortDir: 'asc'
    }
  },
  computed: {
    formatTime() {
      return (time) => moment(time).format('DD/MM/YYYY HH:mm')
    },
    headerIcon() {
      return this.currentSortDir === 'asc' ? 'mdi-arrow-down' : 'mdi-arrow-up'
    },
    sortedItems() {
      return _.orderBy(this.items, [this.currentSort], [this.currentSortDir])
    }
  },
  methods: {
    ...mapActions({
      changeDialogDelete: 'delete/changeDialog',
      changeDialog: 'user/changeDialog',
      setWaitEvent: 'user/setWaitEvent',
      clickRow: 'user/clickRow',
      getScreenPermission: 'screen/getPermission'
    }),
    filterText(value, search, item) {
      value = String(value)
      if (this.formatTime(value) !== 'Invalid date') {
        value = this.formatTime(value)
      }

      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().includes(search)
      )
    },
    clickUserRow(item) {
      if (!this.$store.state.screen.saving) {
        this.clickRow(item)
        this.getScreenPermission(item.id)
      }
    },
    deleteConfirm(item) {
      this.changeDialogDelete(true)
      this.setWaitEvent(item)
    },
    editItem(item) {
      // console.log(item)
      this.setWaitEvent(item)
      this.changeDialog(true)
    },
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
