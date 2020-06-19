<template>
  <v-form ref="loginForm" v-model="valid">
    <v-text-field
      v-model="username"
      label="Uesrname"
      :rules="rules.username"
      :counter="25"
      prepend-icon="mdi-account"
      placeholder="username"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      :rules="rules.password"
      :counter="25"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      placeholder="password"
      prepend-icon="mdi-lock"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
    <AlertForm
      v-if="alert.show"
      class="mt-2"
      :type="alert.type"
      :text="alert.text"
    />
    <v-row justify="end">
      <v-btn
        class="mr-4 mt-2"
        color="primary"
        :loading="loading"
        @click="logingIn"
        >Login</v-btn
      >
    </v-row>
  </v-form>
</template>

<script>
import AlertForm from '@/components/AlertForm'

export default {
  name: 'LoginForm',
  components: {
    AlertForm
  },
  data() {
    return {
      alert: {
        show: false,
        type: 'error',
        text: ''
      },
      showPassword: false,
      valid: false,
      loading: false,
      username: '',
      password: '',
      rules: {
        username: [
          (v) => !!v || 'Username is required',
          (v) =>
            (v && v.length <= 25) || 'Username must be less than 25 characters',
          (v) =>
            (v && v.length >= 3) || 'Username must be more than 3 characters'
        ],
        password: [
          (v) => !!v || 'Password is required',
          (v) =>
            (v && v.length <= 25) || 'Password must be less than 25 characters',
          (v) =>
            (v && v.length >= 3) || 'Username must be more than 3 characters'
        ]
      }
    }
  },
  methods: {
    async logingIn() {
      const validated = this.$refs.loginForm.validate()
      if (validated) {
        this.alert.show = false
        this.loading = true
        try {
          await this.$auth.loginWith('local', {
            data: {
              username: this.username,
              password: this.password
            }
          })
          this.$router.push('/')
          // console.log(response)
        } catch (err) {
          this.alert.show = true
          this.alert.text = 'Invalid username or password!'
          console.log(err)
        }
        // this.$router.push('/')
        // console.log('login success')
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
