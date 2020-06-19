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
  name: 'FormDevice',
  data() {
    return {
      name: 'device'
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.device.deleteConfirm
      },
      set(val) {
        this.$store.dispatch('device/changeDialogDelete', val)
      }
    }
  },
  methods: {
    confirm() {
      this.$store.dispatch('device/deleteItem')
    },
    cancel() {
      this.$store.dispatch('device/changeDialogDelete', false)
      this.$store.dispatch('device/setWaitEvent', null)
    }
  }
}
</script>

<style></style>
