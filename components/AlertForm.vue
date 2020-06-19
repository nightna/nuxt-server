<template>
  <v-alert :type="type">{{ text }}</v-alert>
</template>

<script>
export default {
  name: 'AlertForm',
  props: {
    type: {
      type: String,
      default: 'success'
    },
    text: {
      type: String,
      default: 'alerttttt'
    }
  }
}
</script>

<style></style>
