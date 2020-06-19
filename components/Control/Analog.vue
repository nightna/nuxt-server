<template>
  <v-card flat color="transparent">
    <v-card-title class="mb-3"> {{ name }} </v-card-title>
    <v-card-text>
      <div v-for="slider in sliders" :key="slider.key">
        <v-slider
          v-model="slider.value"
          :label="slider.name"
          prepend-icon="mdi-arrow-right-thick"
          min="0"
          max="100"
          thumb-label="always"
          :thumb-size="20"
          hide-details
          class="mb-5"
          :readonly="input"
          @input="updateSlider(slider)"
        ></v-slider>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Analog',
  props: {
    name: {
      type: String,
      required: true
    },
    sliders: {
      type: Array,
      required: true
    },
    input: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  methods: {
    updateSlider(slider) {
      console.log(slider.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
