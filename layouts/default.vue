<template>
  <v-app>
    <MyHeader></MyHeader>
    <v-main>
      <nuxt />
    </v-main>
    <NotificationsList />
  </v-app>
</template>

<script>
import MyHeader from '@/components/Navigation/MyHeader.vue'
import NotificationsList from '@/components/Notification/NotificationsList'

export default {
  middleware: ['auth'],
  name: 'Default',
  components: {
    MyHeader,
    NotificationsList
  },
  async beforeDestroy() {
    await this.$auth.logout()
  }
}
</script>
