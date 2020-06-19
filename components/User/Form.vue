<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-container>
        <h2>{{ formTitle }} User</h2>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="username"
            label="Username"
            :rules="rules.name"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="rules.password"
          ></v-text-field>
          <v-select
            v-model="role"
            :items="roleItems"
            label="Role"
            :rules="rules.role"
          ></v-select>
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
import _ from 'lodash'
import AlertForm from '@/components/AlertForm'

export default {
  name: 'FormDevice',
  components: {
    'alert-form': AlertForm
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
      username: '',
      password: '',
      role: '',
      rules: {
        username: [(v) => !!v || 'Username is required'],
        password: [(v) => !!v || 'Password is required'],
        role: [(v) => !!v || 'Role is required']
      }
    }
  },
  computed: {
    roleItems() {
      return _.map(this.$store.state.role.items, 'name')
    },
    formTitle() {
      return this.$store.state.user.editIndex >= 0 ? 'Edit' : 'New'
    },
    dialog: {
      get() {
        return this.$store.state.user.dialogShow
      },
      set(val) {
        this.$store.dispatch('user/changeDialog', val)
      }
    }
  },
  watch: {
    dialog(val) {
      // console.log(val)
      this.rules.password = [(v) => !!v || 'Password is required']
      if (val && this.$store.state.user.editIndex >= 0) {
        const editItem = this.$store.state.user.waitEvent
        this.rules.password = []
        console.log(editItem)
        this.username = editItem.username
        this.password = ''
        this.role = editItem.Role.name
      }
      if (!val) {
        this.$refs.form.reset()
        this.username = ''
        this.password = ''
        this.role = ''
        this.$store.dispatch('user/setWaitEvent', null)
      }
    }
  },
  methods: {
    ...mapActions({
      insert: 'user/insert',
      edit: 'user/edit'
    }),
    async submit() {
      this.loading = true
      this.alert.show = false
      if (this.$refs.form.validate()) {
        const role = _.find(
          this.$store.state.role.items,
          (e) => e.name === this.role
        )
        const data = {
          username: this.username,
          password: this.password,
          roleId: role.id
        }
        // console.log(data)

        let suc = false

        if (this.$store.state.user.editIndex >= 0) {
          if (!this.password) {
            delete data.password
          }
          suc = await this.edit(data)
        } else {
          suc = await this.insert(data)
        }

        if (suc) {
          this.$refs.form.reset()
        } else {
          this.alert.show = true
          this.alert.text = 'Cannot create new user'
        }
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
