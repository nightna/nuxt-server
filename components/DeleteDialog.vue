<template>
  <v-dialog v-model="dialog" width="350">
    <v-card>
      <v-card-title primary-title> Delete {{ name }} </v-card-title>
      <v-card-text class="pb-0">
        Are you sure to delete this item
        <v-row>
          <v-col></v-col>
          <v-col align="end">
            <v-btn color="success" :loading="loading" @click="confirm">
              confirm
            </v-btn>
          </v-col>
          <v-col align="end">
            <v-btn color="error" @click="cancel">
              cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    name: {
      type: String,
      required: true
    },
    storeName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.delete.show
      },
      set(val) {
        this.$store.dispatch('delete/changeDialog', val)
      }
    }
  },
  methods: {
    async confirm() {
      this.loading = true
      await this.$store.dispatch(
        this.storeName + '/deleteItem',
        this.$store.state.delete.item
      )
      this.loading = false
      this.$store.dispatch('delete/changeDialog', false)
      this.$store.commit('delete/SET_ITEM', {})
    },
    cancel() {
      this.$store.dispatch('delete/changeDialog', false)
      // this.$store.dispatch(this.storeName + '/setWaitEvent', null)
      this.$store.commit('delete/SET_ITEM', {})
    }
  }
}
</script>

<style></style>
