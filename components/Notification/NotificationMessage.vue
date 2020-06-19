<template>
  <v-alert
    :color="notification.color"
    border="left"
    max-width="200"
    class="body-2 mb-1"
    dense
    tile
    dark
  >
    {{ notification.text }}
  </v-alert>
</template>

<script>
export default {
  name: 'NotificationMessage',
  props: {
    notification: {
      type: Object,
      required: true
    },
    single: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => {
      if (this.single) {
        this.$store.dispatch('notification/POP_NOTI')
      } else {
        this.$store.dispatch('notification/CLOSE_NOTI', this.notification.id)
      }
    }, 2000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  }
}
</script>
