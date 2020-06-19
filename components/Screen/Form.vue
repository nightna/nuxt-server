<template
  ><v-dialog v-model="dialog" width="500">
    <v-card>
      <v-container>
        <h2>{{ formTitle }} Screen</h2>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="screenId"
            label="Screen ID"
            :rules="rules.screenId"
          ></v-text-field>
          <v-text-field
            v-model="name"
            label="Name"
            :rules="rules.name"
          ></v-text-field>
          <alert-form
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
  name: 'ScreenForm',
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
      screenId: '',
      name: '',
      role: '',
      rules: {
        screenId: [(v) => !!v || 'Screen ID is required'],
        name: [(v) => !!v || 'Name is required']
      }
    }
  },
  computed: {
    formTitle() {
      return this.$store.state.edit.editIndex >= 0 ? 'Edit' : 'New'
    },
    dialog: {
      get() {
        return this.$store.state.screen.dialogShow
      },
      set(val) {
        this.$store.commit('screen/SET_DIALOG', val)
      }
    }
  },
  watch: {
    dialog(val) {
      // console.log(val)
      if (val && this.$store.state.edit.editIndex >= 0) {
        const editItem = this.$store.state.edit.editItem
        console.log(editItem)
        this.screenId = editItem?.screenId
        this.name = editItem?.name
      }
      if (!val) {
        this.$refs.form.reset()
        this.screenId = ''
        this.name = ''
        this.$store.commit('edit/SET_WAIT_ACTIONS', {})
      }
    }
  },
  methods: {
    ...mapActions({
      insert: 'screen/insert',
      edit: 'screen/edit'
    }),
    async submit() {
      this.loading = true
      this.alert.show = false
      if (this.$refs.form.validate()) {
        const data = {
          screenId: this.screenId,
          name: this.name
        }
        // console.log(data)

        let suc = false

        if (this.$store.state.edit.editIndex >= 0) {
          suc = await this.edit({
            data,
            editItem: this.$store.state.edit.editItem
          })
        } else {
          suc = await this.insert(data)
        }

        if (suc) {
          this.$refs.form.reset()
        } else {
          this.alert.show = true
          this.alert.text = 'Cannot create new screen'
        }
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
