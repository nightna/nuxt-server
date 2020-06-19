<template>
  <v-container grid-list-lg>
    <h1>{{ header }}</h1>
    <v-row>
      <v-col cols="12" lg="8" md="12" sm="12">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline">User</h3>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="changeDialog(true)">ADD</v-btn>
          </v-card-title>
          <UserTable
            :headers="userTable.tableHeader"
            :items="userTable.tableItems"
          />
        </v-card>
      </v-col>
      <v-col v-if="userRow" cols="12" lg="4" md="12" sm="12">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline">{{ userRow.username }} Screen</h3>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :loading="saving"
              @click="saveScreen({ userRow, perItem })"
            >
              SAVE
            </v-btn>
          </v-card-title>
          <ScreenPermissionTable
            :headers="screen.tableHeader"
            :items="perItem"
          />
        </v-card>
      </v-col>
    </v-row>

    <UserForm />
    <DeleteDialog
      :name="userTable.delete.name"
      :store-name="userTable.delete.storeName"
    />
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import UserTable from '@/components/User/Table'
import UserForm from '@/components/User/Form'
import DeleteDialog from '@/components/DeleteDialog'
import ScreenPermissionTable from '@/components/Screen/TableUserPermission.vue'

export default {
  components: {
    UserTable,
    UserForm,
    DeleteDialog,
    ScreenPermissionTable
  },
  data() {
    return {
      header: 'User Permission Maintenence',
      userTable: {
        tableHeader: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
            sortable: false
          },
          { text: 'Actions', value: 'actions', sortable: false },
          { text: 'Username', value: 'username' },
          { text: 'Role', value: 'Role.name' },
          { text: 'Created At', value: 'createdAt' },
          { text: 'Updated At', value: 'updatedAt' }
        ],
        tableItems: [],
        delete: {
          name: 'User',
          storeName: 'user'
        }
      },
      screen: {
        tableHeader: [
          {
            text: 'ID',
            align: 'start'
          },
          { text: '', value: 'actions', sortable: false },
          { text: 'Screen ID' },
          { text: 'name' }
        ],
        tableItems: [],
        delete: {
          name: 'User',
          storeName: 'user'
        }
      }
    }
  },
  computed: {
    ...mapState({
      userRow: (state) => state.user.userRow,
      saving: (state) => state.screen.saving
    }),
    ...mapGetters({
      perItem: 'screen/userPerAndScreen'
    })
  },
  async mounted() {
    await this.getUser()
    await this.getRole()
    await this.getScreen()
    this.userTable.tableItems = this.$store.state.user.items
  },
  methods: {
    ...mapActions({
      getUser: 'user/getData',
      getRole: 'role/getData',
      getScreen: 'screen/getData',
      save: 'screen/save',
      changeDialog: 'user/changeDialog',
      setWaitEvent: 'user/setWaitEvent'
    }),
    async saveScreen({ userRow, perItem }) {
      this.$store.commit('screen/SET_SAVING', true)
      await this.save({ userRow, perItem })
      this.$store.commit('screen/SET_SAVING', false)
    }
  }
}
</script>

<style></style>
