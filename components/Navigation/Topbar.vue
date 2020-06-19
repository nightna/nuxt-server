<template>
  <v-app-bar app dark>
    <v-app-bar-nav-icon
      v-show="$store.state.bar.isMobile"
      @click="toggle()"
    ></v-app-bar-nav-icon>
    <div class="d-flex align-center mr-5" @click="$router.push('/')">
      <h1>{{ $store.state.bar.headerBar }}</h1>
    </div>
    <v-spacer></v-spacer>
    <v-btn target="_blank" text @click="logout">
      <span class="mr-2">Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Topbar',
  methods: {
    ...mapMutations({
      toggle: 'bar/TOGGLE'
    }),
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
<style lang="scss" scoped></style>
