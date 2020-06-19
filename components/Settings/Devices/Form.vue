<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-container>
        <h2>{{ formTitle }} Devices</h2>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="name"
            label="Name"
            :rules="rules.name"
          ></v-text-field>
          <v-text-field
            v-model="ip"
            label="IP"
            :rules="rules.ip"
          ></v-text-field>
          <v-text-field
            v-model="port"
            type="number"
            label="Port"
            :rules="rules.port"
          ></v-text-field>
          <v-text-field
            v-model="unitId"
            label="Unit Id"
            type="number"
            :rules="rules.unitId"
          ></v-text-field>
          <AlertForm
            v-show="alert.show"
            :type="alert.type"
            :text="alert.text"
          />
          <v-btn
            :disabled="!valid"
            :loading="loading"
            color="primary"
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
  name: 'FormDevice',
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
      ip: '',
      port: '',
      unitId: '',
      rules: {
        name: [(v) => !!v || 'Name is required'],
        ip: [(v) => !!v || 'Ip is required'],
        port: [(v) => !!v || 'Port is required'],
        unitId: [(v) => !!v || 'Unit id is required']
      }
    }
  },
  computed: {
    formTitle() {
      return this.$store.state.device.editIndex >= 0 ? 'Edit' : 'New'
    },
    dialog: {
      get() {
        return this.$store.state.device.dialogShow
      },
      set(val) {
        this.$store.dispatch('device/changeDialog', val)
      }
    }
  },
  watch: {
    dialog(val) {
      // console.log(val)
      if (val && this.$store.state.device.editIndex >= 0) {
        const editItem = this.$store.state.device.waitEvent
        this.name = editItem.name
        this.ip = editItem.ip
        this.port = editItem.port
        this.unitId = editItem.unitId
      }
      if (!val) {
        this.$refs.form.reset()
        this.name = ''
        this.ip = ''
        this.port = ''
        this.unitId = ''
        this.$store.dispatch('device/setWaitEvent', null)
      }
    }
  },
  methods: {
    ...mapActions({
      insert: 'device/insert',
      edit: 'device/edit'
    }),
    async submit() {
      this.loading = true
      this.alert.show = false
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          ip: this.ip,
          port: this.port,
          unitId: this.unitId
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
          this.alert.text = 'Cannot create new device'
        }
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
