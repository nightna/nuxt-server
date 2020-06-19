<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: ['notAuth'],
  name: 'Login',
  methods: {}
}
</script>

<style></style>
