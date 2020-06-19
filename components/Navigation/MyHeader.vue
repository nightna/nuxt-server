<template>
  <div class="">
    <Topbar></Topbar>
    <Sidebar></Sidebar>
  </div>
</template>
<script>
import Topbar from '@/components/Navigation/Topbar.vue'
import Sidebar from '@/components/Navigation/Sidebar.vue'
export default {
  name: 'Header',
  components: {
    Sidebar,
    Topbar
  }
}
</script>
<style lang="scss" scoped></style>
