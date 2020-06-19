<template>
  <v-card>
    <v-card-title primary-title>
      {{ name }}
    </v-card-title>
    <v-card-text>
      <VueSvgGauge
        :start-angle="-90"
        :end-angle="90"
        :value="value"
        :min="min"
        :max="max"
        :gauge-color="color"
        :scale-interval="10"
        :separator-thickness="0"
      >
      </VueSvgGauge>
      <h4 class="text-center">{{ value + unit }}</h4>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Speedometer',

  props: {
    name: {
      type: String,
      default: 'canvas'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 50
    },
    color: {
      type: String,
      default: '#9C27B0'
    },
    unit: {
      type: String,
      default: '#9C27B0'
    }
  }
}
</script>

<style></style>
