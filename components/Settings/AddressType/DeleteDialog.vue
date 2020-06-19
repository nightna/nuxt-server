<template>
  <v-dialog v-model="dialog" width="350">
    <v-card>
      <v-card-title primary-title> Delete {{ name }} </v-card-title>
      <v-card-text class="pb-0">
        Are you sure to delete this item
        <v-row>
          <v-col></v-col>
          <v-col align="end">
            <v-btn color="success" @click="confirm">
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
  name: 'FormAddressType',
  data() {
    return {
      name: 'Address Type'
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.addressType.deleteConfirm
      },
      set(val) {
        this.$store.dispatch('addressType/changeDialogDelete', val)
      }
    }
  },
  methods: {
    confirm() {
      this.$store.dispatch('addressType/deleteItem')
    },
    cancel() {
      this.$store.dispatch('addressType/changeDialogDelete', false)
      this.$store.dispatch('addressType/setWaitEvent', null)
    }
  }
}
</script>

<style></style>
