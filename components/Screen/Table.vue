<template>
  <client-only>
    <v-data-table
      :headers="headers"
      :items="sortedItems"
      :items-per-page="10"
      item-key="id"
      hide-default-header
      dense
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
        <!-- {{ filterItem }} -->
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
              <v-icon small class="mr-2 " @click="editItem(item, i)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteConfirm(item)">
                mdi-delete
              </v-icon>
            </td>
            <td>{{ item.screenId }}</td>
            <td>{{ item.name }}</td>
            <td>
              {{ formatTime(item.createdAt) }}
            </td>
            <td>
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
import { mapActions, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  name: 'ScreenTable',
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
      currentSort: 'screenId',
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
      return _.orderBy(
        this.filterItem,
        [this.currentSort],
        [this.currentSortDir]
      )
    },
    filterItem() {
      if (this.search.length === 0) {
        return this.items
      }
      const filter = _.filter(this.items, (e) => {
        return Object.values(e).some((s) => {
          return _.includes(String(s), this.search)
        })
      })
      return filter
    }
  },
  methods: {
    ...mapActions({
      changeDialogDelete: 'delete/changeDialog'
    }),
    ...mapMutations({
      SET_DELETE_ITEM: 'delete/SET_ITEM',
      changeDialog: 'screen/SET_DIALOG',
      setWaitEvent: 'edit/SET_WAIT_ACTIONS'
    }),
    clickUserRow(item) {
      this.clickRow(item)
      this.getScreenPermission(item.id)
    },
    deleteConfirm(item) {
      this.changeDialogDelete(true)
      this.SET_DELETE_ITEM(item)
    },
    editItem(item, index) {
      this.setWaitEvent({ item, index })
      this.changeDialog(true)
    },
    sort(header) {
      if (header.sortable === false) return
      if (header.value === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = header.value
    }
  }
}
</script>
