<template>
  <v-container grid-list-lg>
    <h1>{{ header }}</h1>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline">{{ header }} table</h3>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="changeDialog(true)">ADD</v-btn>
          </v-card-title>
          <ScreenTable :headers="screen.tableHeader" :items="screenItems" />
        </v-card>
      </v-col>
    </v-row>
    <DeleteDialog :name="screen.name" :store-name="screen.storeName" />
    <ScreenForm />
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import ScreenTable from '@/components/Screen/Table'
import DeleteDialog from '@/components/DeleteDialog'
import ScreenForm from '@/components/Screen/Form'

export default {
  name: 'Screen',
  components: {
    ScreenTable,
    DeleteDialog,
    ScreenForm
  },
  data() {
    return {
      header: 'Screen management',
      screen: {
        tableHeader: [
          {
            text: 'ID',
            align: 'start',
            sortable: false
          },
          { text: '', value: 'actions', sortable: false },
          { text: 'Screen ID', value: 'screenId' },
          { text: 'name', value: 'name' },
          { text: 'Create At', value: 'createdAt' },
          { text: 'Update At', value: 'updatedAt' }
        ],
        name: 'Screen',
        storeName: 'screen'
      }
    }
  },
  computed: {
    ...mapState({
      screenItems: (state) => state.screen.tableItems
    })
  },
  async mounted() {
    await this.getScreen()
    // console.log(this.screenItems)
  },
  methods: {
    ...mapActions({
      getScreen: 'screen/getData'
    }),
    ...mapMutations({
      changeDialog: 'screen/SET_DIALOG'
    })
  }
}
</script>

<style></style>
