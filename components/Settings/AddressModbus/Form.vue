<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-container>
        <h2>{{ formTitle }} {{ device.name }} Address</h2>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="name"
            label="Address name"
            :rules="rules.name"
          ></v-text-field>
          <v-text-field
            v-model="address"
            label="Address"
            :rules="rules.address"
            type="number"
          ></v-text-field>
          <v-select
            v-model="typeName"
            label="Type"
            :rules="rules.typeName"
            :items="getAddressTypeName"
          ></v-select>
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
import { mapActions, mapGetters } from 'vuex'
import AlertForm from '@/components/AlertForm'

export default {
  name: 'FormAddressModbus',
  components: {
    AlertForm
  },
  data() {
    return {
      device: {},
      typeItems: [],
      loading: false,
      alert: {
        show: false,
        type: 'error',
        text: 'Can not connect to database'
      },
      valid: true,
      name: '',
      address: '',
      typeName: null,
      rules: {
        name: [(v) => !!v || 'Name is required'],
        address: [(v) => !!v || 'Address is required'],
        typeName: [(v) => !!v || 'Type is required']
      }
    }
  },
  computed: {
    ...mapGetters({
      getAddressTypeByName: 'addressType/getAddressTypeByName',
      getAddressTypeName: 'addressType/getTypeName'
    }),
    formTitle() {
      return this.$store.state.addressModbus.editIndex >= 0 ? 'Edit' : 'New'
    },
    dialog: {
      get() {
        return this.$store.state.addressModbus.dialogShow
      },
      set(val) {
        this.$store.dispatch('addressModbus/changeDialog', val)
      }
    }
  },
  watch: {
    dialog(val) {
      // console.log(val)
      this.device = this.$store.state.addressModbus.device

      if (val && this.$store.state.addressModbus.editIndex >= 0) {
        const editItem = this.$store.state.addressModbus.waitEvent
        this.name = editItem.name
        this.address = editItem.address
        this.typeName = editItem.AddressType.name
      }
      if (!val) {
        this.$refs.form.reset()
        this.name = ''
        this.address = ''
        this.typeName = null
        this.$store.dispatch('addressModbus/setWaitEvent', null)
      }
    }
  },
  methods: {
    ...mapActions({
      insert: 'addressModbus/insert',
      edit: 'addressModbus/edit'
    }),
    async submit() {
      this.loading = true
      this.alert.show = false

      if (this.$refs.form.validate()) {
        const type = this.getAddressTypeByName(this.typeName)
        const data = {
          name: this.name,
          address: this.address,
          device_id: this.device.id,
          type_id: type.id
        }

        let suc = false

        if (this.$store.state.addressModbus.editIndex >= 0) {
          console.log(data)

          suc = await this.edit(data)
        } else {
          suc = true
          suc = await this.insert(data)
        }

        if (suc) {
          this.$refs.form.reset()
        } else {
          this.alert.show = true
          this.alert.text = 'Cannot create new address'
        }
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
