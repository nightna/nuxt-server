<template>
  <v-card flat color="transparent">
    <v-card-title class="pa-2">{{ name }}</v-card-title>
    <v-card-text>
      <div v-if="type === 'block'">
        <v-row>
          <v-col v-for="btn in btns" :key="btn.key" :sm="3" :md="2">
            <v-btn
              :color="btn.status ? 'success' : 'error'"
              block
              :ripple="false"
              @click="!input ? click(btn) : null"
            >
              {{ btn.name }}: {{ btn.status ? 'NO' : 'OFF' }}
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row>
          <v-col
            v-for="btn in btns"
            :key="btn.key"
            col="2"
            :xs="3"
            :sm="2"
            :md="2"
            :lg="1"
          >
            <v-btn
              :color="btn.status ? 'success' : 'error'"
              fab
              @click="!input ? click(btn) : null"
            >
              {{ btn.name }}
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'Digital',
  props: {
    name: {
      type: String,
      required: true
    },
    btns: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'block'
    },
    input: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click(btn) {
      console.log(this.input)
      const index = this.btns.indexOf(btn)
      console.log(index)
      this.btns[index].status = !this.btns[index].status
    }
  }
}
</script>
<style lang="scss" scoped></style>
