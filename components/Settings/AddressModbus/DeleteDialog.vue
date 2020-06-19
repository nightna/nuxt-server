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
  name: 'FormAddressModbus',
  data() {
    return {
      name: 'Address modbus'
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.addressModbus.deleteConfirm
      },
      set(val) {
        this.$store.dispatch('addressModbus/changeDialogDelete', val)
      }
    }
  },
  methods: {
    confirm() {
      this.$store.dispatch('addressModbus/deleteItem')
    },
    cancel() {
      this.$store.dispatch('addressModbus/changeDialogDelete', false)
      this.$store.dispatch('addressModbus/setWaitEvent', null)
    }
  }
}
</script>

<style></style>
