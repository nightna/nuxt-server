<template>
  <div class="notifications-list mr-3">
    <transition-group v-if="!single" name="slide" tag="div">
      <NotoficaionMessage
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
    <!-- <transition v-else-if="notifications[0]">
      <NotoficaionMessage :notification="notifications[0]" :single="true" />
    </transition> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotoficaionMessage from './NotificationMessage'
export default {
  name: 'NotificaionsList',
  components: {
    NotoficaionMessage
  },
  data() {
    return {
      single: false
    }
  },
  computed: mapState('notification', ['notifications'])
}
</script>

<style>
.notifications-list {
  position: fixed;
  top: 70px;
  right: 0;
}

.slide-enter-active {
  transition: all 0.5s ease;
}

.slide-leave-active {
  transition: all 0.8s;
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
