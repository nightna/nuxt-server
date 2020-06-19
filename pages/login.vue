<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <LoginForm />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import LoginForm from '@/components/Form/LoginForm'

export default {
  name: 'LoginPage',
  layout: 'login',
  components: {
    LoginForm
  },
  computed: {
    ...mapState({
      title: (state) => state.login.formTitle
    })
  }
}
</script>

<style></style>
