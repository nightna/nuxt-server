<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-container>
        <h2>{{ formTitle }} Address type</h2>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="name"
            label="Name"
            :rules="rules.name"
          ></v-text-field>
          <AlertForm
            v-show="alert.show"
            :type="alert.type"
            :text="alert.text"
          />
          <v-btn
            :disabled="!valid"
            color="primary"
            :loading="loading"
            @click="submit"
          >
            submit
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import AlertForm from '@/components/AlertForm'

export default {
  name: 'FormAddressType',
  components: {
    AlertForm
  },
  data() {
    return {
      loading: false,
      alert: {
        show: false,
        type: 'error',
        text: 'Can not connect to database'
      },
      valid: true,
      name: '',
      rules: {
        name: [(v) => !!v || 'Name is required']
      }
    }
  },
  computed: {
    formTitle() {
      return this.$store.state.addressType.editIndex >= 0 ? 'Edit' : 'New'
    },
    dialog: {
      get() {
        return this.$store.state.addressType.dialogShow
      },
      set(val) {
        this.$store.dispatch('addressType/changeDialog', val)
      }
    }
  },
  watch: {
    dialog(val) {
      // console.log(val)
      if (val && this.$store.state.addressType.editIndex >= 0) {
        const editItem = this.$store.state.addressType.waitEvent
        this.name = editItem.name
        this.ip = editItem.ip
        this.port = editItem.port
        this.unitId = editItem.unitId
      }
      if (!val) {
        this.$refs.form.reset()
        this.name = ''
        this.$store.dispatch('addressType/setWaitEvent', null)
      }
    }
  },
  methods: {
    ...mapActions({
      insert: 'addressType/insert',
      edit: 'addressType/edit'
    }),
    async submit() {
      this.loading = true
      this.alert.show = false
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name
        }
        let suc = false

        if (this.$store.state.device.editIndex >= 0) {
          suc = await this.edit(data)
        } else {
          suc = await this.insert(data)
        }

        if (suc) {
          this.$refs.form.reset()
        } else {
          this.alert.show = true
          this.alert.text = 'Cannot create new address type'
        }
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
